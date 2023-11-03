import React, { useState, useEffect } from "react";
import "./Estimate.css";
import axios from "axios";

const Estimate = () => {
   //Various variables
   const [questionSet, setQuestionSet] = useState([]);
   const [subQuestion, setSubQuestion] = useState([]);
   const [option, setOption] = useState([]);

   const [selectedQuestionSet, setSelectedQuestionSet] = useState("");
   const [currentSubQuestionIndex, setCurrentSubQuestionIndex] = useState(0);
   const [showSelectedAnswers, setShowSelectedAnswers] = useState(false);
   const token = localStorage.getItem("token");

   //Store questions and answers
   const [selectQuestion, setSelectedQuestion] = useState("");
   const [selectedAnswers, setSelectedAnswers] = useState([]);

   const getQuestion = () => {
      axios
         .get("http://localhost:3001/question")
         .then((res) => {
            setQuestionSet(res.data);
            console.log(res.data);
         })
         .catch((err) => {
            console.error("Error fetching data from table Questions: ", err);
         });
   };

   const getSubQuestion = (id) => {
      axios
         .get(`http://localhost:3001/subquestion${id}/${id}`)
         .then((res) => {
            setSubQuestion(res.data);
            console.log(res.data);
         })
         .catch((err) => {
            console.error("Error fetching from table Sub_Questions: ", err);
         });
   };

   const getOption = (id) => {
      axios
         .get(`http://localhost:3001/option${id}/${id}`)
         .then((res) => {
            setOption(res.data);
            console.log(res.data);
         })
         .catch((err) => {
            console.error("Error fetching from table Options: ", err);
         });
   };

   useEffect(() => {
      getQuestion();
   }, []);

   const handleSelectQuestionSet = (id) => {
      console.log("Question ID: " + id);
      setSelectedQuestionSet(id);
      getSubQuestion(id);
      getOption(id);
      setSelectedQuestion(questionSet[id - 1].question_text);
   };

   const handleBackClick = () => {
      if (currentSubQuestionIndex === 0 || showSelectedAnswers === true) {
         setSelectedQuestionSet("");
         setCurrentSubQuestionIndex(0);
         setShowSelectedAnswers(false);
         setSelectedQuestion("");
         setSelectedAnswers({});
      } else {
         setCurrentSubQuestionIndex(currentSubQuestionIndex - 1);
      }
   };

   const handleNextClick = () => {
      if (
         selectedAnswers[
            subQuestion[currentSubQuestionIndex]?.sub_question_text
         ]
      ) {
         if (currentSubQuestionIndex < subQuestion.length - 1) {
            setCurrentSubQuestionIndex(currentSubQuestionIndex + 1);
         }
         if (currentSubQuestionIndex > subQuestion.length - 2) {
            setShowSelectedAnswers(true);
         }
      } else {
         alert("โปรดเลือกคำตอบก่อนที่จะดำเนินการต่อ");
      }
   };

   const handleOptionClick = (option_text, option_price) => {
      setSelectedAnswers({
         ...selectedAnswers,
         [subQuestion[currentSubQuestionIndex].sub_question_text]: {
            text: option_text,
            price: option_price,
         },
      });
      console.log(selectedAnswers);
   };

   const calculateTotalPrice = () => {
      const areaSize = parseFloat(
         selectedAnswers["ขนาดพื้นที่งานก่อสร้าง"].text
      );

      let totalPrice = 0;
      for (const key in selectedAnswers) {
         if (selectedAnswers[key].price != 0) {
            totalPrice += areaSize * parseFloat(selectedAnswers[key].price);
         }
      }
      return totalPrice.toLocaleString();
   };

   return (
      <div className="est-main">
         <div className="est-info">
            {/* Select plan */}
            {!selectedQuestionSet && (
               <div className="est-question">
                  <h2>เลือกประเภทของโครงการก่อสร้าง</h2>
                  <div className="question-choice">
                     {questionSet.map((i) => {
                        return (
                           <button
                              onClick={() =>
                                 handleSelectQuestionSet(i.question_id)
                              }
                              key={i.question_id}
                           >
                              {i.question_text}
                           </button>
                        );
                     })}
                  </div>
               </div>
            )}

            {/* Question and answer */}
            {selectedQuestionSet && !showSelectedAnswers && (
               <div className="est-choice">
                  <h3>
                     {subQuestion[currentSubQuestionIndex]?.sub_question_text}
                  </h3>
                  {subQuestion[currentSubQuestionIndex]?.img && (
                     <img
                        src={subQuestion[currentSubQuestionIndex]?.img}
                        alt={
                           subQuestion[currentSubQuestionIndex]
                              ?.sub_question_text
                        }
                     />
                  )}
                  <div className="choice">
                     {subQuestion[currentSubQuestionIndex]
                        ?.sub_question_type === "text" ? (
                        <div className="choice-input">
                           <input
                              type="number"
                              value={
                                 selectedAnswers[
                                    subQuestion[currentSubQuestionIndex]
                                       ?.sub_question_text
                                 ]?.text || ""
                              }
                              placeholder="กรุณาใส่ตัวเลข"
                              onChange={(i) => {
                                 handleOptionClick(i.target.value, 0);
                              }}
                           />
                        </div>
                     ) : (
                        <div className="choice-button">
                           {option
                              .filter(
                                 (i) =>
                                    i.sub_question_id ===
                                    currentSubQuestionIndex + 1
                              )
                              .map((i) => (
                                 <div key={i.option_id}>
                                    <button
                                       className={
                                          selectedAnswers[
                                             subQuestion[
                                                currentSubQuestionIndex
                                             ]?.sub_question_text
                                          ]?.text === i.option_text
                                             ? "active"
                                             : ""
                                       }
                                       onClick={() => {
                                          handleOptionClick(
                                             i.option_text,
                                             i.price
                                          );
                                       }}
                                    >
                                       {i.option_text}
                                    </button>
                                 </div>
                              ))}
                        </div>
                     )}
                  </div>
                  <div className="nav-btn">
                     <button onClick={handleBackClick}>ย้อนกลับ</button>
                     <button onClick={handleNextClick}>ต่อไป</button>
                  </div>
               </div>
            )}

            {/* Show answer if user*/}
            {token && showSelectedAnswers && (
               <div className="show-answer">
                  <h1>รายการที่คุณเลือก</h1>
                  <h2>{selectQuestion}</h2>
                  {Object.keys(selectedAnswers).map((key) => (
                     <div className="answer" key={key}>
                        <div className="answer-left">
                           <h3>{key}</h3>
                        </div>
                        <div className="answer-right">
                           <h3>{selectedAnswers[key].text}</h3>
                           {selectedAnswers[key].price != 0 && (
                              <h3>{selectedAnswers[key].price}/ตร.ม</h3>
                           )}
                        </div>
                     </div>
                  ))}
                  <h2>ราคารวม: {calculateTotalPrice()} บาท</h2>
                  <button onClick={handleBackClick}>กลับสู่หน้าแรก</button>
               </div>
            )}

            {/* Show answer not user*/}
            {!token && showSelectedAnswers && (
               <div className="show-answer">
                  <h1>รายการที่คุณเลือก</h1>
                  <h2>{selectQuestion}</h2>
                  {Object.keys(selectedAnswers).map((key) => (
                     <div className="answer" key={key}>
                        <div className="answer-left">
                           <h3>{key}</h3>
                        </div>
                        <div className="answer-right">
                           <h3>{selectedAnswers[key].text}</h3>
                        </div>
                     </div>
                  ))}
                  <h2>ราคาโดยประมาณ: {calculateTotalPrice()} บาท</h2>
                  <button onClick={handleBackClick}>กลับสู่หน้าแรก</button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Estimate;