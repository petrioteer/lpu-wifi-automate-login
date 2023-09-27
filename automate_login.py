from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

#setting location of webdriver -- set your own location 
service = Service('C:\chromedriver.exe')

options = Options()
options.add_argument('--headless=new')
driver = webdriver.Chrome(service=service, options=options)

driver.implicitly_wait(2)

def opening_browser():
    driver.get("https://internet.lpu.in/24online/webpages/client.jsp")
    print("starting Driver...")
    
    
    Select_Box_Name = driver.find_element(by=By.NAME, value = "username")
    Select_Box_Name.click()
    
    #here in place of "xyz" just replace it with your Reg. Number in double quotes.. eg. "xyz" --> "12327845"
    Select_Box_Name.send_keys("xyz")
    
    Select_Box_Name = driver.find_element(by=By.NAME, value = "password")
    Select_Box_Name.click()
    
    #Again, replace "xyz" with your internet password that you set in your UMS.
    Select_Box_Name.send_keys("xyz")

    Select_Box_Name = driver.find_element(by=By.ID, value = "agreepolicy")
    Select_Box_Name.click()
    

    click_send = driver.find_element(by=By.ID, value ="loginbtn")
    click_send.click()
    print("Login Successful, Exiting...")

opening_browser()
