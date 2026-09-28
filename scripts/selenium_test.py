import os
import sys
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_selenium_audit():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    results = {
        "total_cards": 0,
        "loaded_images": 0,
        "broken_images": 0,
        "products": [],
        "broken_list": [],
    }
    
    try:
        url = "http://localhost:3001/productos"
        print(f"Navigating to {url}...")
        driver.get(url)
        
        # Wait for products to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "img"))
        )
        
        time.sleep(2)
        
        # Scroll to load all images (if lazy loading)
        scroll_height = driver.execute_script("return document.body.scrollHeight")
        for i in range(0, scroll_height, 600):
            driver.execute_script(f"window.scrollTo(0, {i});")
            time.sleep(0.1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(0.5)
        
        # Take screenshot of the page
        os.makedirs("selenium_screenshots", exist_ok=True)
        driver.save_screenshot("selenium_screenshots/productos_page.png")
        print("Screenshot saved to selenium_screenshots/productos_page.png")
        
        # Get all product cards
        # Let's inspect elements
        product_elements = driver.find_elements(By.CSS_SELECTOR, "article, .group, [data-product-id], a[href*='/producto/']")
        print(f"Found {len(product_elements)} potential product card elements")
        
        # Also let's find all images on the page
        images = driver.find_elements(By.TAG_NAME, "img")
        print(f"Found {len(images)} total img tags on the page")
        
        img_audit = []
        for idx, img in enumerate(images):
            src = img.get_attribute("src") or ""
            alt = img.get_attribute("alt") or ""
            
            # Check if naturalWidth > 0
            is_loaded = driver.execute_script(
                "return arguments[0].complete && typeof arguments[0].naturalWidth != 'undefined' && arguments[0].naturalWidth > 0",
                img
            )
            
            # Parent text/title
            parent_text = ""
            try:
                parent = img.find_element(By.XPATH, "./ancestor::div[contains(@class, 'card') or contains(@class, 'group') or contains(@class, 'product') or position()=1]")
                parent_text = parent.text.split("\n")[0] if parent.text else ""
            except:
                parent_text = ""
                
            status = "OK" if is_loaded else "BROKEN"
            
            if not is_loaded and "/img_productos/" in src:
                results["broken_images"] += 1
                results["broken_list"].append({"src": src, "alt": alt, "text": parent_text})
            elif "/img_productos/" in src:
                results["loaded_images"] += 1
                
            img_audit.append({
                "index": idx,
                "src": src,
                "alt": alt,
                "parent_text": parent_text,
                "loaded": is_loaded,
                "status": status
            })
            
        results["total_img_tags"] = len(images)
        results["img_audit"] = img_audit
        
        # Save audit report to JSON
        with open("selenium_audit_report.json", "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
            
        print(f"\n=== AUDIT SUMMARY ===")
        print(f"Total product images checked: {results['loaded_images'] + results['broken_images']}")
        print(f"Loaded successfully: {results['loaded_images']}")
        print(f"Broken images: {results['broken_images']}")
        if results["broken_list"]:
            print("Broken images details:")
            for b in results["broken_list"]:
                print(f"  - {b['src']} (alt: {b['alt']})")
                
    finally:
        driver.quit()

if __name__ == "__main__":
    run_selenium_audit()
