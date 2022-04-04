const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false
  });
  async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100000;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
  
                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
  }
  async function screenshot(path, width, height, quality, deviceScaleFactor, type, fullPage, encoding) {
    await page.setViewport({
      width: width,
      height: height,
      deviceScaleFactor: deviceScaleFactor,
    })
    page.screenshot({ 
      path: path,
      type: type,
      fullPage: fullPage,
      encoding: encoding,
      quality: quality,
    })
  }
  const page = (await browser.pages())[0];
  await autoScroll(page)
  await page.goto('https://openseauserdata.com/');
    const extractedText = await page.$eval('*', (el) => el.innerText);
    if (extractedText.includes("") === true) {
     var pageContainsNFT = true;
    } else {
      var pageContainsNFT = false;
    }
    if (pageContainsNFT === true) {
      console.log(" ")
      console.log("the page Contains an NFT(s)")
      await page.waitForTimeout(1500)
      console.log(" ")
      console.log("Running Screenshot Prosess")
      const imgs = await page.$$eval('img[src]', imgs => imgs.map(img => img.getAttribute('src')));
      console.log("Screenshotting" + " " + imgs)
    function random_item() {
  
  return imgs[Math.floor(Math.random()*imgs.length)];
       
   }
   console.log("Curent NFT")
  console.log(random_item(imgs));
  await page.goto(random_item(imgs))
  await page.setViewport({
    width: 1000,
    height: 1000,
    deviceScaleFactor: 1
  })
  var NFTPicNumber = 1
  var ActualNFTNumber = imgs.length
  console.log(ActualNFTNumber)
  await page.screenshot({ path: 'NFT' + NFTPicNumber + ".jpeg"});
  NFTPicNumber + 1
  }
  console.log("Curent NFT")
  console.log(random_item(imgs));
  await page.goto(random_item(imgs))
  await page.setViewport({
    width: 1000,
    height: 1000,
    deviceScaleFactor: 1
  })
  var NFTPicNumber = 1
  var ActualNFTNumber = imgs.length-1
  console.log(ActualNFTNumber)
  screenshot("NFT" + NFTPicNumber + ".jpeg", 1, 1, 100, 1)
  NFTPicNumber + 1
  await page.goto(random_item(imgs))
  screenshot("NFT" + NFTPicNumber + ".jpeg", 1000, 1000, 100, 1)
  NFTPicNumber + 1
  
    if (pageContainsNFT === false) {
      console.log(" ")
      console.log("the page does not contain a NFT")
    }
  
    console.log("Prosess Ended")
    await browser.close();
  })();