import time, pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

BASE_URL = "https://vivek1499-portfolio.vercel.app"

@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver.get(BASE_URL)
    yield driver
    driver.quit()

def test_tc01_page_load(driver):
    assert "Vivek" in driver.title or "Portfolio" in driver.title

def test_tc02_canvas(driver):
    canvas = driver.find_elements(By.TAG_NAME, "canvas")
    assert len(canvas) > 0

def test_tc03_navbar(driver):
    nav_links = driver.find_elements(By.XPATH, "//a | //button | //div[contains(@class,'nav')]")
    assert len(nav_links) >= 3


def test_tc04_projects(driver):
    projects = driver.find_elements(By.XPATH, "//*[contains(text(),'Project')]")
    assert projects

def test_tc05_skills_and_tools(driver):
    # Check that tools/skills section exists
    skills = driver.find_elements(By.XPATH, "//*[contains(text(),'Tools') or contains(text(),'Skills')]")
    assert skills, "Skills/Tools section not found in portfolio"
