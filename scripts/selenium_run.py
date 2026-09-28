import os
import sys
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_selenium():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    os.makedirs("selenium_screenshots", exist_ok=True)
    
    report = {
        "pages": {},
        "summary": {
            "total_product_images": 0,
            "loaded_ok": 0,
            "broken": 0,
            "wix_urls": 0
        }
    }
    
    try:
        # 1. CATALOG PAGE /productos
        driver.get("http://localhost:3001/productos")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "img")))
        time.sleep(1.5)
        
        driver.save_screenshot("selenium_screenshots/01_catalogo_p1.png")
        
        products_verified = []
        page_num = 1
        
        while True:
            # Scroll to trigger any lazy loaders
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
            time.sleep(0.2)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(0.2)
            driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(0.2)
            
            # Find all img tags on this page
            imgs = driver.find_elements(By.TAG_NAME, "img")
            for img in imgs:
                src = img.get_attribute("src") or ""
                alt = img.get_attribute("alt") or ""
                
                if "/img_productos/" in src or "wixstatic" in src:
                    report["summary"]["total_product_images"] += 1
                    if "wixstatic" in src:
                        report["summary"]["wix_urls"] += 1
                    
                    is_loaded = driver.execute_script(
                        "return arguments[0].complete && typeof arguments[0].naturalWidth != 'undefined' && arguments[0].naturalWidth > 0",
                        img
                    )
                    
                    if is_loaded:
                        report["summary"]["loaded_ok"] += 1
                    else:
                        report["summary"]["broken"] += 1
                        
                    products_verified.append({
                        "name": alt,
                        "src": src,
                        "page": page_num,
                        "status": "OK" if is_loaded else "BROKEN"
                    })
                    
            # Next button
            next_btns = driver.find_elements(By.XPATH, f"//button[text()='{page_num + 1}']")
            valid_next = [b for b in next_btns if b.is_displayed() and b.is_enabled()]
            if valid_next and page_num < 15:
                page_num += 1
                driver.execute_script("arguments[0].click();", valid_next[0])
                time.sleep(0.8)
            else:
                break
                
        driver.save_screenshot("selenium_screenshots/02_catalogo_last_page.png")
        report["pages"]["catalogo_productos"] = {
            "pages_navigated": page_num,
            "items_checked": len(products_verified)
        }
        
        # 2. AMAZONI-K PAGE
        driver.get("http://localhost:3001/aceites-amazonik")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "img")))
        time.sleep(1)
        driver.save_screenshot("selenium_screenshots/03_amazonik.png")
        
        amz_imgs = driver.find_elements(By.TAG_NAME, "img")
        amz_items = []
        for img in amz_imgs:
            src = img.get_attribute("src") or ""
            alt = img.get_attribute("alt") or ""
            if "/img_productos/" in src:
                report["summary"]["total_product_images"] += 1
                is_loaded = driver.execute_script(
                    "return arguments[0].complete && typeof arguments[0].naturalWidth != 'undefined' && arguments[0].naturalWidth > 0",
                    img
                )
                if is_loaded:
                    report["summary"]["loaded_ok"] += 1
                else:
                    report["summary"]["broken"] += 1
                amz_items.append({"name": alt, "src": src, "status": "OK" if is_loaded else "BROKEN"})
                
        report["pages"]["amazonik"] = amz_items
        
        # 3. HOME PAGE
        driver.get("http://localhost:3001/")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "img")))
        time.sleep(1)
        driver.save_screenshot("selenium_screenshots/04_homepage.png")
        
        # Write report
        with open("selenium_final_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
            
        print("AUDIT FINISHED:")
        print(f"Total product images checked: {report['summary']['total_product_images']}")
        print(f"Loaded OK: {report['summary']['loaded_ok']}")
        print(f"Broken: {report['summary']['broken']}")
        print(f"Wix URLs: {report['summary']['wix_urls']}")
        
    finally:
        driver.quit()

if __name__ == "__main__":
    run_selenium()
