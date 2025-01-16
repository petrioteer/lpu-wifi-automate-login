import os
import asyncio
from pyppeteer import launch
from pyppeteer.errors import PageError
from dotenv import load_dotenv

load_dotenv()

username = os.getenv('REGNO')
password = os.getenv('PASSWORD')

import asyncio
from pyppeteer import launch
from pyppeteer.errors import PageError

username = '12320263'
password = 'Itesh@2003'
url = 'https://internet.lpu.in/24online/webpages/client.jsp'


async def login():

    chrome_path = 'C:/Program Files/Google/Chrome/Application/chrome.exe'



    browser = await launch(
        headless=False,
        executablePath=chrome_path,
        )
      
    page = await browser.newPage()

    await page.goto(url) 

    try:
        await page.click('#agreepolicy')
    except PageError:
        print("\n\n------------------\nAlready logged In!\n------------------")
        return

    #await page.waitForSelector('#loginbtn', {'visible': True})


    await page.type('input[name = "username"]', username)  
    await page.type('input[name = "password"]', password)  

    
    await page.click('#loginbtn')

    
    print("\n\n------------------\nLogin Succesful!\n------------------")
    await browser.close()
    

asyncio.get_event_loop().run_until_complete(login())