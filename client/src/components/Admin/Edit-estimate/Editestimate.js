import React, { useEffect, useState } from 'react'
import './Editestimate.css'
import axios from 'axios';


export const Editestimate = () => {
  const [questions, setQuestions] = useState([]);
  const [SelectedQuestion, setSelectedQuestion] = useState('');
  const [sub_questions, setSubQuestions] = useState([]);
  const [SelectedSubquestion, setSelectedSubQuestion] = useState('');
  const [Options, setOptions] = useState([]);
  const [Modal, setModal] = useState(false);



  const OnEditquestionClicked = (id) => {
    setSelectedQuestion(id);
    axios.get(`http://localhost:3001/getSubquestion/${id}`)
      .then((response) => {
        setSubQuestions(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล', error);
      });
  }

  const OnEditSubquestionClicked = (id) => {
    setSelectedSubQuestion(id);
    axios.get(`http://localhost:3001/getOption/${id}`)
      .then((response) => {
        setOptions(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล', error);
      });
  }

  const ClearQuestionSelected = () => {
    setSelectedQuestion('');
  }

  const ClearSubquestionSelected = () => {
    setSelectedSubQuestion('');
  }

  const toggleModal = () => {
    setModal(!Modal)
  }

  useEffect(() => {
    axios.get("http://localhost:3001/getQuestion")
      .then((response) => {
        setQuestions(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล', error);
      });
  }, []);

  return (
    <>{SelectedQuestion === ''
      ? (
        questions.map((e) => (
          <div className="admin-edit-container" key={e.question_id}>
            <div className='info-left'>
              <p className='question-title' onDoubleClick={toggleModal}>{e.question_text}</p>
              {Modal && (
                <div className='modal'>
                  <div className='overlay-modal' onClick={toggleModal}></div>
                  <div className='modal-content'>
                    <h2>แก้ไขข้อมูล</h2>
                    <input type="text" className='edit-title' placeholder={e.question_text} />
                    <button className='close-modal' onClick={toggleModal}>ปิด</button>
                    <button className='confirm-btn' onClick={toggleModal}>ยืนยัน</button>
                  </div>
                </div>
              )}
            </div>
            <div className='info-right'>
              <div className='edit'>
                <button className='edit-btn' onClick={() => OnEditquestionClicked(e.question_id)}>แก้ไขข้อมูล</button>
                <span className='space'>|</span>
                <button className='edit-btn' onClick={() => { console.log(SelectedQuestion) }}>ลบ</button>
              </div>
            </div>
          </div>
        ))
      )
      : (SelectedSubquestion === ''
        ? ((<div className='subquestion-page' style={{ overflow: "hidden" }}>
          <div className="add-question-button" onClick={ClearQuestionSelected}>
            ย้อนกลับ
          </div>
          <button className='edit-btn' onClick={() => { console.log(sub_questions) }}></button>
          <div className='all-subquestion'>
            {sub_questions.map((e) => {
              return (
                <div className="subquestion-container" key={e.sub_question_id}>
                  <div className='info-left'>
                    <button className='question-title' onDoubleClick={toggleModal}>{e.sub_question_text}</button>
                    {Modal && (
                      <div className='modal'>
                        <div className='overlay-modal' onClick={toggleModal}></div>
                        <div className='modal-content'>
                          <h2>แก้ไขข้อมูล</h2>
                          <input type="text" className='edit-title' placeholder={e.sub_question_text} />
                          <button className='close-modal' onClick={toggleModal}>ปิด</button>
                          <button className='confirm-btn' onClick={toggleModal}>ยืนยัน</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='info-right'>

                    <div className='edit'>
                      <button className='edit-btn' onClick={() => OnEditSubquestionClicked(e.sub_question_id)}>แก้ไขข้อมูล</button>
                      <span className='space'>|</span>
                      <button className='edit-btn' onClick={() => { console.log(SelectedQuestion) }}>ลบ</button>
                    </div>

                  </div>
                </div>)
            })}
          </div>
        </div>
        ))
        : (<div>
          <div className="add-question-button" onClick={ClearSubquestionSelected}>
            ย้อนกลับ
          </div>
          <h1>{SelectedSubquestion}</h1></div>)
      )
    }
    </>
  )
}