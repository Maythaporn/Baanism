import React from "react";
import "./About.css"; // Import the CSS file for this component
import Gallery from "./Gallery";
import Home1 from '../../assets/images/Home1.png'
import Home2 from '../../assets/images/Home2.png'

function Intro() {
  return (
    <>
      <div className="AboutContainer">

        <div className="content-container">
          <div className="contentbox1">
            <img className="icon" src="https://s3-alpha-sig.figma.com/img/2236/c840/7a9d2cd5b7b9aefa59e1352aeb7dbaf7?Expires=1696809600&Signature=L2dHuWdOiijIICWmhV5ttt-FrnRnw7YCT3SMyy4TLXkIKywgFf3zDibV54-xQG5en~ZHd9mvSUmDM4IT2xEsQ~72dgVaVZoNgMinbUql3IB5h44OU5SNhkFpoce8VJtlhDE6x-NtGVaxo7FuXpZbctWctCcnE7ijF~8BBecz7iQPr5COqx~UIQsEQPY52BGTaGNfweWX6O2imfaHrv64hEb2nrBvuRK7e9gjqfa4VGpP7qrzXAotq7rCrX94jTAEvaOty0XctRZBzA3XjHsz52UnXETFME882tSY7vCBnygVD2aNS4-AmCoFyfBIe4cLUWNeZ5rliWfc9~o6JiK1UQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt=""></img>
          </div>
          <div className="contentbox2">
            <h2>คุณภาพวัสดุมาตรฐานอุตสาหกรรม</h2>
            <p>โครงสร้างหลักเน้นการผลิตจากอุตสาหกรรม</p>
            <p>ผ่านการรับรองคุณภาพ ลดปัญหางานก่อสร้าง</p>
          </div>
        </div>


        <div className="content-container">
          <div className="contentbox1">
            <img className="icon" src="https://s3-alpha-sig.figma.com/img/3742/d206/8eba46a208f00aedce57adc1ebe2034b?Expires=1696809600&Signature=Rpz-YcQXd9RDlyskyT316LaX5UkZTiUUe1lrGsTd0MZ2ZnC3ujhDPBq4AiezZo56hVJbvE3y425KAF4ZV84FGjuVs2MGeSwX-3GESnPdEXEIIqL-Gf~5phHiLLYQmu-jggG6gBK9kNSj0awo9I3mEVlTeQPHgJzom9L6jfVUSTmqreK-PIBg5JABGueOGzQDUquPMycZpODmCO0HC-F09w8GWQkjxzCDJEBhoDr6AxMSAkMo5pksfyLnDbPBeESd6QA0NuSeqF9vuEFo7z3XaWY14A3NXEX2Rwpx~UF4WEwQWy4q68gKVnQNQOxHYcETGwqWxbMzTbgq543HwgzelA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="no-image-use"></img>
          </div>
          <div className="contentbox2">
            <h2>ออกแบบและเซ็นรับรองสถาปนิกและวิศวกรโยธา ไม่มีค่าใช้จ่าย!</h2>
            <p>เพื่อส่งมอบงานที่มีคุณภาพสูงสุด</p>
            <p>เรามีทีมสถาปนิกและวิศวกรออกแบบและเซ็น</p>
            <p>รับรองแบบให้คุณโดยไม่มีค่าใช้จ่ายเพิ่ม</p>
          </div>
        </div>


        <div className="content-container">
          <div className="contentbox1">
            <img className="icon" src="https://s3-alpha-sig.figma.com/img/fe16/b792/aedcfb3680c230c2231837139e01206b?Expires=1696809600&Signature=RLzQTvTiZgF7NdQPejfml3B6P2CY3hl-yEg~ElWnSQeZ3q4lZ2KYCQcYEhRXixd93d0RTEAU83EfAZ34VNAZXiNwoDpNr-GGRRCC3iTAdFktWMpJUppo3lP9hdo46E~y8qwfC0uWaJFfeCCwMF6Wt3-MEjV6pyrTAdBKdNf6NkHdrrwxk~11knCfOxdXpjKxx9hHe0RZ8DoDvRATNQYyJla0JPKqFoeH6GAswDU6tVN59Aikf07FAJ3obg9-IBRRejJaJcErSzWkI6yPEzu4Od7thBQej6ix-rtu1uTZw2kNWawbseU~KXIZ30MekddBonJery5rkWeZ9EO4mJAdyA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="no-image-use"></img>
          </div>
          <div className="contentbox2">
            <h2>เวลาชัดเจน ไม่ล่าช้า</h2>
            <p>ด้วยงานโครงสร้างที่มาจากอุตสาหกรรม เพียงติดตั้ง</p>
            <p>หน้างานก่อสร้าง จึงสามารถกำหนดเวลาได้ชัดเจน</p>
            <p>ลดปัญหางานก่อสร้างที่ล่าช้า</p>
          </div>
        </div>


        <div className="content-container">
          <div className="contentbox1">
            <img className="icon" src="https://s3-alpha-sig.figma.com/img/8d85/dad6/dd27d7a80d62b8890759e24e4101e214?Expires=1696809600&Signature=QwKC57oLVI0jHoyMhXngYEX0rnFCmFrY4OHDuFJQzmsQOrWAv-8DoFMahZRYsxHINaOpdEFIrK2HG8f02G~HQqRgssv9OV~Jrw27KZCLgp6b5mrq7rEph5EMiatHYdoVgl9Xk92lzNXBbNwU~nI45RaZLAsBVDLSNfqryAdagyhhit2SyT5fI2N~q6jNaaLTzPryw0TbtKNXpX83zdpcSg1hRxqhwustbmqdiJVGXgyZVqoA07P1DpWq4-sa1FL14o5WJNrqmiZm~vOHt6U0JJBbsjpSlx~s42rFjIEVtQ5D4ZKCguEOvX-x1dJf6I2OI-GwBUUNlsNBcilbcNplew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="no-image-use"></img>
          </div>
          <div className="contentbox2">
            <h2>รับประกันงานก่อสร้าง</h2>
            <p>รับประกันงานก่อสร้าง 1 ปี</p>
            <p>มีบริการตรวจสุขภาพบ้าน 1 ครั้ง ภายใน 6 เดือนแรก</p>
          </div>
        </div>


        <div className="content-container-large">
          <div className="contentbox1-large">
            <img className="icon-large" src="https://i.ibb.co/ZKD9Dhd/c3deabee55608326557e6ca17831f55a-1.png" alt="no-image-use"></img>
          </div>
          <div className="contentbox2-large">
            <p>เราเป็นผู้เชี่ยวชาญงานต่อเติมด้วย Construction Technology ที่ต้องการแก้ปัญหา
              งานก่อสร้างที่ไม่ได้คุณภาพ ซึ่งเป็นหนึ่งในปัญหาที่มีการร้องเรียนโดยในหมวดงานก่อสร้างมากที่สุด เราจึงมองหาวิธีการก่อสร้างเพื่อส่งมอบ “บ้าน” ที่ดีที่สุดให้กับเจ้าของบ้าน
              ลดปัญหางานก่อสร้างไม่ได้คุณภาพ งานล่าช้า และงบประมาณบานปลายที่เกิดจาก
              ความเสียหายของงานก่อสร้าง</p>
          </div>
        </div>
      </div>


      <div className="OperateContainer">
        <div class="op-content-container1">
          <h1>ขั้นตอนการทำงาน</h1>
        </div>

        <div class="op-content-container2">
          <img src="https://i.ibb.co/kVZwbyd/Home1.png" className="img-center"></img>
        </div>

        <div class="op-content-container3">
          <img src="https://i.ibb.co/jJBCW4g/Home2.png" className="img-center"></img>
        </div>

        <div class="op-content-container4">

          <div className="op-content-box">
            <div className="op-content1">
              <p>01</p>
              <img src="https://s3-alpha-sig.figma.com/img/1508/43d9/7c5440d08ddcdac8c7fbb91ef1385495?Expires=1697414400&Signature=Adb0UePlIqXj6kciWbNQGIjdNvfKn3h-5-Qq-G8IxM7EQu-c79M7M9DOCAiQHsujPfI55-KL0awY1g3g6SBXkeCG3IUbqCuLZMDck37kTl4bD-9JU1TGoVwYYersw~kxKWO7AMOGTxWo5pY26zfkeF1Fbr6pz0fBM0Mc6w3VCssratZew2idJVlmnONqclhibC7UEgduZMxO8ofYsbd4dKJgAzUHYpwNK5Ig-t~y8TAjHoctbSyKj5J8aTiXJZp7TFPMFQQM0u05Hl~bQgu3VCTc7d1GQDlESHV5HVdBfJhVyeftB~EjTBq3X~Ph7moIeUeltMLgGry-VTxUxsBumg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
            </div>
            <div className="op-content2">
              <h2>กรอกข้อมูลเบื้องต้น</h2>
              <h2>และนัดหมายเข้าสำรวจ</h2>
              <p>ลงทะเบียนและนัดหมายเวลาให้ทีม</p>
              <p>เข้าสำรวจหน้างาน ภายใน 5-7 วัน</p>
              <p>โดยไม่มีค่าใช้จ่าย</p>
            </div>
          </div>

          <div className="op-content-box">
            <div className="op-content1">
              <p>02</p>
              <img src="https://s3-alpha-sig.figma.com/img/d4f5/3670/486fe6bb7a088ce1e5cdc74f6536de02?Expires=1697414400&Signature=ahkdWXtfbg5ZQ9Mv2zyeClyowBNYqHMx5rZ4-KvgZJ2M~BuVXxIZtaVB3c8UMyt2nP18-BjIeqa2gv-YwYr4OxTzsXBdCvM1skoulhlXXhiC7pW9tCdk10gRn5uCmB7yQREezk~pXdlNPLG5~QsSCt-LhRc6LuL0-b1hOKmb5QLSsp6UdzpluIUAFZU5Hd5vm98--WEZeZokoEDOvcTdc5beZ9AZhOf0j-DHg4ikZLTBhzrvbXTN-WZ1I74ECTfzxB6KnR38ncFQ6KLH83yF70tYmB1-xQO8uVzvDsOX5EW54-Q08Xtnwwz6fxbMW8hWmOd9QOZOBH55OkLg15WxnQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
            </div>
            <div className="op-content2">
              <h2>เซ็นรับรองมาตรฐานโดย</h2>
              <h2>วิศวกรและสถาปนิก</h2>
              <p>ออกแบบฟรีไม่มีค่าใช้จ่ายและเซ็นรับรองมาตรฐานโดยสถาปนิกและวิศวกร หลังจากเซ็นใบเสนอราคา
                พร้อมสัญญางานก่อสร้างให้คุณได้สบายใจกับมาตรฐานที่มอบให้เทียบเท่ากับงานก่อสร้างใหญ่</p>
            </div>
          </div>

          <div className="op-content-box">
            <div className="op-content1">
              <p>03</p>
              <img src="https://i.ibb.co/ZdzyJbq/72ded4291530cf50a8740b471df40269-1.png"></img>
            </div>
            <div className="op-content2">
              <h2>ผลิตโครงสร้างหลักใน</h2>
              <h2>โรงงานอุตสาหกรรม</h2>
              <p>ก่อสร้างในโรงงานอุตสาหกรรมระยะ</p>
              <p>เวลาตามกำหนด (ขึ้นอยู่กับขนาดพื้นที่)</p>
            </div>
          </div>

          <div className="op-content-box">
            <div className="op-content1">
              <p>04</p>
              <img src="https://s3-alpha-sig.figma.com/img/0378/d66b/696333334ef04e666c1f17455f0839aa?Expires=1697414400&Signature=IW7Fa5m0Ycrnd4OK8r-e3Wxoa3xUeROWyqFnTwUldpKy7kWCatkQ-qCYDP5hZRHXXB4ing0SLmkj2XG74qPsG3nTKKxmbqfzLVFTmHvZ-a1765Zh5zZ0VbenrC1hpdpHSY6OyOJkknfRiDgb2kQyLqEnY2biiYocU2MJzuyUQ93~7kM0vFQU00~b-CNDb7QYkW5DaMcsnrNNK6NgqqZbQy2~Xntt4rotD4Vu4g17q2kIz5Lle99Imxlxg7trmf7dYPCjgc6ZlZQiXdkzmpq7Z6Hxh9K7DOJtxeIkuIwcAsop09UOZKlfwNbENwdXheHCMVLSn7dIIX64wIQOxfraPA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
            </div>
            <div className="op-content2">
              <h2>เตรียมหน้างาน พร้อมติดตั้ง</h2>
              <p>เตรียมงานหน้างานเตรียมความพร้อม</p>
              <p>ติดตั้งโครงสร้างหลักจากอุตสาหกรรม</p>
            </div>
          </div>

          <div className="op-content-box">
            <div className="op-content1">
              <p>05</p>
              <img src="https://s3-alpha-sig.figma.com/img/7050/bc55/1d411ee5d9164255d601cc4d31cade5f?Expires=1697414400&Signature=dWxEs3hsdzbZPHeAdK0H9QN8QqT~BufxOX72EGve62Kw4oEB~0YAmhmiDisapUCLqLJIqzNIkS7N6tFka3z1jxVOOsL3rt4bKHtrCSWnAsE9PGRBC0nZ05QO2pbjnCFmcTW2NI70niULLKhBbbYtKy9jJhUniRWEuFhK835RLKg6K-Z26FTRPlOIpHCYpwgWowo7PoElaAfD7Z5BupoSCUiztYriSHoOnKyNEZrKYdbOxGXhvMm7Rzx4FykCdkRu~RNi1otNiQYmlM3cmhabPYDDxMx~p~-deZ5mRBaOQoWmFrEFKUAbsSu3b5iyi2fuXnKmJKhMeakmTJ4rb7uE1g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
            </div>
            <div className="op-content2">
              <h2>ตรวจความเรียบร้อยบ้านก่อนส่งมอบ</h2>
              <p>ให้เจ้าของบ้านตรวจความเรียบร้อย</p>
              <p>ก่อนส่งมอบงาน</p>
            </div>
          </div>

          <div className="op-content-box">
            <div className="op-content1">
              <p>06</p>
              <img src="https://s3-alpha-sig.figma.com/img/bf31/51e2/59e0b19252861cd36507fcb886c10440?Expires=1697414400&Signature=cg9pmNJhDVsoyUOW7Yya5cVhcQTI3hFnodswEcjFlJyYlrfouzH0xM7zXElOYi9GPcwnojvTTciS3B75AaS4lSeMO-UqAmXE0xGseIJJVtImpbn1hfyGklDI2ik~o6T~DsETvbOSRPkPb5XSWjt0fnbrXGUqSbRI7zRrgknJkmb2A6Juzgw-0GG1kyIf2Tho0a4yLOVWR4ES-cG7yGM0poIBVbJn3vtpwQTospOPQ1UUD6Nky4h4n9hoGzmo1zVFU3obqhXT7KwedbvxLST6mRypND5G7Ulq7~pETZFln31wOqCQE6~5oEYZ8PXknWn8tAM~-OtD5MpGVzgmsA5zJw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"></img>
            </div>
            <div className="op-content2">
              <h2>การันตีคุณภาพตลอดระยะเวลา 1 ปี</h2>
              <p>รับรองคุณภาพให้เจ้าของบ้านได้สบายใจ</p>
              <p>ตลอดระยะเวลารับประกัน พร้อมตรวจสุขภาพ</p>
              <p>บ้านฟรี 1 ครั้งในช่วง 6 เดือนแรก</p>
            </div>
          </div>

        </div>
      </div>

      <Gallery />
    </>
  );
}

export default Intro;
