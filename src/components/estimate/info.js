const questions = {
   questions: [
      {
         question: "ต่อเติมห้อง",
         subQuestions: [
            {
               subQuestion: "มีงานรื้อถอนโครงสร้างเดิมหรือไม่",
               options: [
                  { text: "ไม่มีการรื้อถอน", type: "button" },
                  { text: "มีการรื้อถอนโครงสร้างเดิม", type: "button" },
               ],
            },
            {
               subQuestion: "ต้องการลงเสาเข็มหรือไม่",
               options: [
                  { text: "เสาเข็มสั้น", type: "button" },
                  { text: "เสาเข็มยาว", type: "button" },
                  { text: "ไม่ลงเสาเข็ม", type: "button" },
               ],
            },
            {
               subQuestion: "วัสดุมุงหลังคา",
               options: [
                  { text: "เมทัลชีท", type: "button" },
                  { text: "เมทัลชีท + PE", type: "button" },
                  { text: "เมทัลชีท + PU", type: "button" },
                  { text: "ไวนิล", type: "button" },
                  { text: "โพลีคาบอร์เนต", type: "button" },
                  { text: "ไฟเบอร์กลาส", type: "button" },
                  { text: "ซินโคไลท์", type: "button" },
               ],
            },
            {
               subQuestion: "รูปแบบการก่อพนัง",
               options: [
                  { text: "พนังก่ออิฐ", type: "button" },
                  { text: "ไม่มีงานก่อสร้าง", type: "button" },
               ],
            },
            {
               subQuestion: "ก่อเคาน์เตอร์ครัวปูน",
               options: [
                  { text: "มี", type: "button" },
                  {
                     text: "ไม่มี",
                     type: "button",
                  },
               ],
            },
            {
               subQuestion: "ลักษณะ",
               options: [
                  { text: "ตัว I", type: "button" },
                  { text: "ตัว L", type: "button" },
                  { text: "ตัว U", type: "button" },
                  { text: "ตัว II", type: "button" },
               ],
            },
            {
               subQuestion: "ความยาว",
               options: [{ text: "ใส่เป็น เมตร", type: "button" }],
            },
            {
               subQuestion: "วัสดุ Top เคาน์เตอร์",
               options: [
                  { text: "กระเบื้อง", type: "button" },
                  { text: "หินแกรนิต", type: "button" },
                  { text: "หินควอตซ์", type: "button" },
                  { text: "หินสังเคราะห์", type: "button" },
               ],
            },
            {
               subQuestion: "ระบบไฟไฟ้า/ระบบประปา",
               options: [
                  { text: "เดินท่อน้ำลอย", type: "button" },
                  { text: "เดินท่อน้ำผังพนัง", type: "button" },
                  { text: "ไม่ต้องการ", type: "button" },
               ],
            },
            {
               subQuestion: "วัสดุกระเบื้องพื้น",
               options: [
                  { text: "แกรนิตโต้", type: "button" },
                  { text: "เซรามิค", type: "button" },
                  { text: "ยาง", type: "button" },
                  { text: "หินจริง", type: "button" },
                  { text: "หินเทียม", type: "button" },
                  { text: "พื้นลามิเนต", type: "button" },
                  { text: "Emgineering wood", type: "button" },
                  { text: "ปูนเปลีอย", type: "button" },
               ],
            },
            {
               subQuestion: "วัสดุกระเบื้องพนัง",
               options: [
                  { text: "เซรามิค", type: "button" },
                  { text: "ฉาบเรียบ ทาสี", type: "button" },
               ],
            },
            {
               subQuestion: "ฝ้าใต้หลังคา",
               options: [
                  { text: "ยิปซั่มฉาบเรียบ", type: "button" },
                  { text: "สมาร์ทบอร์ด", type: "button" },
                  { text: "ไม่มีฝ้า", type: "button" },
               ],
            },
            {
               subQuestion: "เกรดสี",
               options: [
                  { text: "Strandard", type: "button" },
                  { text: "Premium", type: "button" },
                  { text: "Ultra Premium", type: "button" },
               ],
            },
            // {
            //    subQuestion: "แบบงานก่อสร้าง",
            //    options: [],
            // },
            // {
            //    subQuestion: "ขนาดพื้นที่การก่อสร้าง",
            //    options: [],
            // },
            // {
            //    subQuestion: "รูปแบบพื้นที่ก่อสร้างปัจจุบัน",
            //    options: [],
            // },
            // {
            //    subQuestion: "รายละเอียดเพิ่มเติม",
            //    options: [],
            // },
            {
               subQuestion: "มีประเภทงานอื่นก่อสร้างพร้อมกันหรือไม่",
               options: [
                  { text: "ต่อเติมโรงจอดรถ", type: "button" },
                  { text: "ต่อเติมพื้นรอบตัวบ้าน", type: "button" },
                  { text: "ไม่มี", type: "button" },
               ],
            },
         ],
      },
   ],
   questions2: [
      {
         question: "ต่อเติมโรงจอดรถ",
         subQuestions: [
            {
               subQuestion: "มีงานรื้อถอนโครงสร้างเดิมหรือไม่",
               options: [
                  { text: "ไม่มีการรื้อถอน", type: "button" },
                  { text: "มีการรื้อถอนโครงสร้างเดิม", type: "button" },
               ],
            },
            {
               subQuestion: "ต้องการลงเสาเข็มหรือไม่",
               options: [
                  { text: "เสาเข็มสั้น", type: "button" },
                  { text: "เสาเข็มยาว", type: "button" },
                  { text: "ไม่ลงเสาเข็ม", type: "button" },
               ],
            },
            {
               subQuestion: "โครงสร้างหลังคา",
               options: [
                  { text: "เหล็ก", type: "button" },
                  { text: "สแตนเลส", type: "button" },
               ],
            },
            {
               subQuestion: "วัสดุมุงหลังคา",
               options: [
                  { text: "เมทัลชีท", type: "button" },
                  { text: "เมทัลชีท + PE", type: "button" },
                  { text: "เมทัลชีท + PU", type: "button" },
                  { text: "ไวนิล", type: "button" },
                  { text: "โพลีคาบอร์เนต", type: "button" },
                  { text: "ไฟเบอร์กลาส", type: "button" },
                  { text: "ซินโคไลท์", type: "button" },
               ],
            },
            {
               subQuestion: "รูปแบบการก่อพนัง",
               options: [
                  { text: "พนังก่ออิฐ", type: "button" },
                  { text: "ไม่มีงานก่อสร้าง", type: "button" },
               ],
            },
            {
               subQuestion: "ระบบไฟไฟ้า",
               options: [
                  { text: "เดินท่อน้ำลอย", type: "button" },
                  { text: "เดินท่อน้ำผังพนัง", type: "button" },
                  { text: "ไม่ต้องการ", type: "button" },
               ],
            },
            {
               subQuestion: "พื้นลานจอดรถ",
               options: [
                  { text: "กระเบื้อง", type: "button" },
                  { text: "ทรายล้าง", type: "button" },
                  { text: "คอนกรีตแสตมป์", type: "button" },
                  { text: "คอนกรีตขัดเรียบ", type: "button" },
               ],
            },
            {
               subQuestion: "ฝ้าโรงจอดรถ",
               options: [
                  { text: "ฝ้ายิปซั่ม", type: "button" },
                  { text: "ฝ้าสมาร์ทบอร์ด", type: "button" },
                  { text: "ฝ้าไม้เทียม", type: "button" },
                  { text: "ฝ้าเมทัลชีท", type: "button" },
                  { text: "ฝ้าไวนิล", type: "button" },
                  { text: "ไม่มีฝ้าใต้หลังคา", type: "button" },
               ],
            },
            {
               subQuestion: "พื้นลานจอดรถ",
               options: [
                  { text: "กระเบื้อง", type: "button" },
                  { text: "ทรายล้าง", type: "button" },
                  { text: "คอนกรีตแสตมป์", type: "button" },
                  { text: "คอนกรีตขัดเรียบ", type: "button" },
               ],
            },
            // {
            //    subQuestion: "แบบงานก่อสร้าง",
            //    options: [],
            // },
            // {
            //    subQuestion: "ขนาดพื้นที่การก่อสร้าง",
            //    options: [],
            // },
            // {
            //    subQuestion: "รูปแบบพื้นที่ก่อสร้างปัจจุบัน",
            //    options: [],
            // },
            // {
            //    subQuestion: "รายละเอียดเพิ่มเติม",
            //    options: [],
            // },
            {
               subQuestion: "มีประเภทงานอื่นก่อสร้างพร้อมกันหรือไม่",
               options: [
                  { text: "ต่อเติมโรงจอดรถ", type: "button" },
                  { text: "ต่อเติมพื้นรอบตัวบ้าน", type: "button" },
                  { text: "ไม่มี", type: "button" },
               ],
            },
         ],
      },
   ],
   questions3: [
      {
         question: "ต่อเติมพื้นรอบตัวบ้าน",
         subQuestions: [
            {
               subQuestion: "ต้องการลงเสาเข็มหรือไม่",
               options: [
                  { text: "เสาเข็มสั้น", type: "button" },
                  { text: "เสาเข็มยาว", type: "button" },
                  { text: "ไม่ลงเสาเข็ม", type: "button" },
               ],
            },
            {
               subQuestion: "วัสดุกระเบื้องพื้น",
               options: [
                  { text: "งานกระเบื้อง", type: "button" },
                  { text: "งานทรายล้าง", type: "button" },
                  { text: "งานคอนกรีตแสตมป์", type: "button" },
                  { text: "งานคอนกรีตขัดเรียบ", type: "button" },
               ],
            },
            // {
            //    subQuestion: "แบบงานก่อสร้าง",
            //    options: [],
            // },
            // {
            //    subQuestion: "ขนาดพื้นที่การก่อสร้าง",
            //    options: [],
            // },
            // {
            //    subQuestion: "รูปแบบพื้นที่ก่อสร้างปัจจุบัน",
            //    options: [],
            // },
            // {
            //    subQuestion: "รายละเอียดเพิ่มเติม",
            //    options: [],
            // },
            {
               subQuestion: "มีประเภทงานอื่นก่อสร้างพร้อมกันหรือไม่",
               options: [
                  { text: "ต่อเติมโรงจอดรถ", type: "button" },
                  { text: "ต่อเติมพื้นรอบตัวบ้าน", type: "button" },
                  { text: "ไม่มี", type: "button" },
               ],
            },
         ],
      },
   ],
};

export default questions;
