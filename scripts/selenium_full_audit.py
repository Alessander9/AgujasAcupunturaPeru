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

def run_full_audit():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    os.makedirs("selenium_screenshots", exist_ok=True)
    
    audit_results = {
        "pages_tested": [],
        "total_images_checked": 0,
        "valid_images": 0,
        "broken_images": 0,
        "wix_images_found": 0,
        "categories_tested": [],
        "broken_details": [],
        "products_found": []
    }
    
    try:
        # 1. TEST /productos page
        print("\n--- Testing /productos ---")
        driver.get("http://localhost:3001/productos")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "img")))
        time.sleep(2)
        driver.save_screenshot("selenium_screenshots/01_productos_initial.png")
        
        # Check category buttons
        category_buttons = driver.find_elements(By.CSS_SELECTOR, "button[data-category], .category-filter button, [role='tab']")
        print(f"Found {len(category_buttons)} category buttons")
        
        # Test pagination
        page_num = 1
        seen_product_names = set()
        
        while True:
            print(f"Auditing page {page_num}...")
            # Scroll down slowly to trigger any lazy loading
            scroll_height = driver.execute_script("return document.body.scrollHeight")
            for i in range(0, scroll_height, 400):
                driver.execute_script(f"window.scrollTo(0, {i});")
                time.sleep(0.05)
            driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(0.5)
            
            # Find all images
            imgs = driver.find_elements(By.TAG_NAME, "img")
            for img in imgs:
                src = img.get_attribute("src") or ""
                alt = img.get_attribute("alt") or ""
                
                if "/img_productos/" in src or "wixstatic" in src:
                    audit_results["total_images_checked"] += 1
                    
                    if "wixstatic" in src:
                        audit_results["wix_images_found"] += 1
                        print(f"⚠️ WIX image found: {src}")
                        
                    is_loaded = driver.execute_script(
                        "return arguments[0].complete && typeof arguments[0].naturalWidth != 'undefined' && arguments[0].naturalWidth > 0",
                        img
                    )
                    
                    if is_loaded:
                        audit_results["valid_images"] += 1
                    else:
                        audit_results["broken_images"] += 1
                        audit_results["broken_details"].append({
                            "page": f"/productos (pag {page_num})",
                            "src": src,
                            "alt": alt
                        })
                        print(f"❌ Broken image: {src} (alt: {alt})")
                        
                    if alt and alt not in seen_product_names:
                        seen_product_names.add(alt)
                        audit_results["products_found"].append({
                            "name": alt,
                            "src": src,
                            "status": "OK" if is_loaded else "BROKEN"
                        })
            
            # Check for next page button
            next_buttons = driver.find_elements(By.XPATH, "//button[contains(., 'Siguiente') or contains(., '>') or @aria-label='Next page']")
            valid_next = [b for b in next_buttons if b.is_displayed() and b.is_enabled() and not b.get_attribute("disabled")]
            
            # Or check numeric pagination buttons
            if not valid_next:
                page_num_buttons = driver.find_elements(By.XPATH, f"//button[text()='{page_num + 1}']")
                valid_next = [b for b in page_num_buttons if b.is_displayed() and b.is_enabled()]
                
            if valid_next and page_num < 15: # safety cap
                page_num += 1
                driver.execute_script("arguments[0].click();", valid_next[0])
                time.sleep(1)
            else:
                break
                
        driver.save_screenshot("selenium_screenshots/02_productos_final_page.png")
        print(f"Scanned {len(seen_product_names)} unique products across {page_num} pages")
        
        # 2. TEST /aceites-amazonik page
        print("\n--- Testing /aceites-amazonik ---")
        driver.get("http://localhost:3001/aceites-amazonik")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "img")))
        time.sleep(2)
        driver.save_screenshot("selenium_screenshots/03_amazonik_page.png")
        
        imgs_amz = driver.find_elements(By.TAG_NAME, "img")
        for img in imgs_amz:
            src = img.get_attribute("src") or ""
            alt = img.get_attribute("alt") or ""
            if "/img_productos/" in src or "wixstatic" in src:
                audit_results["total_images_checked"] += 1
                if "wixstatic" in src:
                    audit_results["wix_images_found"] += 1
                is_loaded = driver.execute_script(
                    "return arguments[0].complete && typeof arguments[0].naturalWidth != 'undefined' && arguments[0].naturalWidth > 0",
                    img
                )
                if is_loaded:
                    audit_results["valid_images"] += 1
                else:
                    audit_results["broken_images"] += 1
                    audit_results["broken_details"].append({
                        "page": "/aceites-amazonik",
                        "src": src,
                        "alt": alt
                    })
                print(f"Amazoni-k image: {src} -> {'OK' if is_loaded else 'BROKEN'}")

        # 3. TEST Home page /
        print("\n--- Testing Home page (/) ---")
        driver.get("http://localhost:3001/")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "img")))
        time.sleep(2)
        driver.save_screenshot("selenium_screenshots/04_home_page.png")
        
        # Summary Report
        print("\n==============================")
        print("🎯 SELENIUM AUDIT REPORT RESULTS")
        print("==============================")
        print(f"Total product image tags evaluated: {audit_results['total_images_checked']}")
        print(f"Successfully loaded: {audit_results['valid_images']}")
        print(f"Broken / failed images: {audit_results['broken_images']}")
        print(f"Wix URLs remaining: {audit_results['wix_images_found']}")
        print(f"Unique products recorded: {len(audit_results['products_found'])}")
        print("==============================\n")
        
        with open("selenium_full_report.json", "w", encoding="utf-8") as f:
            json.dump(audit_results, f, indent=2, ensure_ascii=False)
            
    finally:
        driver.quit()

if __name__ == "__main__":
    run_full_audit()
