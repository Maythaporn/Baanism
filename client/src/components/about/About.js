import React from "react";
import "./About.css"; // Import the CSS file for this component
import Gallery from "./Gallery";
import Home1 from '../../assets/images/Home1.png'
import Home2 from '../../assets/images/Home2.png'
import About1 from '../../assets/images/About1.png'
import About2 from '../../assets/images/About2.png'
import About3 from '../../assets/images/About3.png'
import About4 from '../../assets/images/About4.png'


function Intro() {
  return (
    <>
      <div className="AboutContainer">

        <div className="content-container">
          <div className="contentbox1">
            <img className="icon" src={About1}></img>
          </div>
          <div className="contentbox2">
            <h2>คุณภาพวัสดุมาตรฐานอุตสาหกรรม</h2>
            <p>โครงสร้างหลักเน้นการผลิตจากอุตสาหกรรม</p>
            <p>ผ่านการรับรองคุณภาพ ลดปัญหางานก่อสร้าง</p>
          </div>
        </div>


        <div className="content-container">
          <div className="contentbox1">
            <img className="icon" src={About2}></img>
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
            <img className="icon" src={About3}></img>
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
            <img className="icon" src={About4}></img>
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
              <img src="https://cdn.discordapp.com/attachments/399046867834503171/1169909555124244491/1.png?ex=65571e2d&is=6544a92d&hm=81f09d3a263eb4541ac79a28910bb650372d9bc537ab00b22154b8d465a9de30&"></img>
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
              <img src="https://cdn.discordapp.com/attachments/399046867834503171/1169909555535302740/2.png?ex=65571e2d&is=6544a92d&hm=610205e14c0e57853a6b3f304eb7b6da807ebb35fafeb2c097e8b83a4d49a477&"></img>
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
              <img src="https://media.discordapp.net/attachments/399046867834503171/1169909556038598708/4.png?ex=65571e2e&is=6544a92e&hm=ac4c59ed1d9dff7c7f2b9a165e0b4c097a1e1bfe1f244c99ac2d0cd2719728f4&="></img>
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
              <img src="https://media.discordapp.net/attachments/399046867834503171/1169909556319621130/5.png?ex=65571e2e&is=6544a92e&hm=e55ab4869bc97a78018879bdc61d4aca8bf8c5a449c5a0be5ae4dd33b42821e3&="></img>
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
              <img src="https://media.discordapp.net/attachments/399046867834503171/1169909556604850256/6.png?ex=65571e2e&is=6544a92e&hm=0f546a833df7e4b6e118f16c24d076cdf4dcfb13b1e5800ed1604d34096546a9&="></img>
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
      <div className="gallery-container">
        <Gallery />
      </div>
    </>
  );
}

export default Intro;
