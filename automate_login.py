from selenium import webdriver
from selenium.webdriver.common.by import By
#required for headless
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

#setting location of webdriver
s = Service('C:\chromedriver.exe')

options = Options()
options.headless = False
driver = webdriver.Chrome(service=s, options=options)

#list_data = []

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
    print("Login Sucessful, Closing Browser...")

opening_browser()
