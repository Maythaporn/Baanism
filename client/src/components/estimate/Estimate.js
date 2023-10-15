import React, { useState } from "react";
import "./Estimate.css";
import questions from "./info";
import Room_img from "../../assets/images/Room_stake.png";

const Estimate = () => {
   const [selectedQuestionSet, setSelectedQuestionSet] = useState(null);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [currentSubQuestionIndex, setCurrentSubQuestionIndex] = useState(0);
   const [selectedAnswers, setSelectedAnswers] = useState({});
   const [showSelectedAnswers, setShowSelectedAnswers] = useState(false);

   const handleSelectQuestionSet = (QuestionSet) => {
      setSelectedQuestionSet(QuestionSet);
      setCurrentQuestionIndex(0);
      setCurrentSubQuestionIndex(0);
      setSelectedAnswers({});
      setShowSelectedAnswers(false);
   };

   const currentQuestionSet = selectedQuestionSet || questions.questions;
   const currentQuestion = currentQuestionSet[currentQuestionIndex];
   const currentSubQuestion =
      currentQuestion.subQuestions[currentSubQuestionIndex];

   const handleOptionClick = (option) => {
      setSelectedAnswers({
         ...selectedAnswers,
         [currentSubQuestion.subQuestion]: option,
      });
   };

   const handleNextClick = () => {
      if (selectedAnswers[currentSubQuestion.subQuestion]) {
         if (
            currentSubQuestionIndex <
            currentQuestion.subQuestions.length - 1
         ) {
            setCurrentSubQuestionIndex(currentSubQuestionIndex + 1);
         } else if (currentQuestionIndex < currentQuestionSet.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentSubQuestionIndex(0);
         } else {
            setShowSelectedAnswers(true);
         }
      } else {
         alert("โปรดเลือกคำตอบก่อนที่จะดำเนินการต่อ");
      }
   };

   const handleBackClick = () => {
      if (currentSubQuestionIndex > 0) {
         setCurrentSubQuestionIndex(currentSubQuestionIndex - 1);
      } else if (currentQuestionIndex > 0) {
         setCurrentQuestionIndex(currentQuestionIndex - 1);
         setCurrentSubQuestionIndex(
            currentQuestionSet[currentQuestionIndex - 1].subQuestions.length - 1
         );
      } else {
         alert("ไม่มีคำถามก่อนหน้านี้");
      }
   };

   const handleBackToQuestionSetClick = () => {
      setSelectedQuestionSet(null);
      setCurrentQuestionIndex(0);
      setCurrentSubQuestionIndex(0);
      setSelectedAnswers({});
      setShowSelectedAnswers(false);
   };

   return (
      <div className="est-main">
         <div className="est-info">
            {/* Select plan */}
            {!selectedQuestionSet && (
               <div className="est-question">
                  <h2>เลือกประเภทของโครงการก่อสร้าง</h2>
                  <div className="question-choice">
                     <button
                        onClick={() =>
                           handleSelectQuestionSet(questions.questions)
                        }
                     >
                        ต่อเติมห้อง
                     </button>
                     <button
                        onClick={() =>
                           handleSelectQuestionSet(questions.questions2)
                        }
                     >
                        ต่อเติมโรงจอดรถ
                     </button>
                     <button
                        onClick={() =>
                           handleSelectQuestionSet(questions.questions3)
                        }
                     >
                        ต่อเติมพื้นรอบตัวบ้าน
                     </button>
                  </div>
               </div>
            )}
            {/* Question and answer */}
            {selectedQuestionSet && !showSelectedAnswers && (
               <div className="est-choice">
                  {/* <h1>{currentQuestion.question}</h1> */}
                  <h2>{currentSubQuestion.subQuestion}</h2>
                  <img src={Room_img} alt="" />
                  <div className="choice">
                     {currentSubQuestion.options.map((option, index) => (
                        <button
                           key={index}
                           className={
                              selectedAnswers[
                                 currentSubQuestion.subQuestion
                              ] === option.text
                                 ? "active"
                                 : ""
                           }
                           onClick={() => handleOptionClick(option.text)}
                        >
                           {option.text}
                        </button>
                     ))}
                  </div>
                  <div className="nav-btn">
                     {currentSubQuestionIndex === 0 && (
                        <button onClick={handleBackToQuestionSetClick}>
                           กลับหน้าแรก
                        </button>
                     )}
                     {currentSubQuestionIndex > 0 && (
                        <button onClick={handleBackClick}>Back</button>
                     )}
                     <button onClick={handleNextClick}>Next</button>
                  </div>
               </div>
            )}
            {/* Show answer */}
            {showSelectedAnswers && (
               <div className="show-answer">
                  <h1>รายการที่คุณเลือก</h1>
                  <h2>{currentQuestion.question}</h2>
                  {Object.keys(selectedAnswers).map((subQuestion, index) => (
                     <div className="answer" key={index}>
                        <div className="answer-left">
                           <h3>{subQuestion}</h3>
                        </div>
                        <div className="answer-right">
                           <h4>{selectedAnswers[subQuestion]}</h4>
                        </div>
                     </div>
                  ))}
                  <button onClick={handleBackToQuestionSetClick}>
                     กลับหน้าแรก
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Estimate;
