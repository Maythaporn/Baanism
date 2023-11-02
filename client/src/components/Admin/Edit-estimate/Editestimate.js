import React, { useEffect, useState } from 'react'
import './Editestimate.css'
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import Dropdown from 'react-dropdown';



export const Editestimate = () => {
  const [questions, setQuestions] = useState([]);
  const [SelectedQuestion, setSelectedQuestion] = useState('');
  const [sub_questions, setSubQuestions] = useState([]);
  const [SelectedSubquestion, setSelectedSubQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [EditModal, setEditmodal] = useState(false);
  const [AddModal, setAddmodal] = useState(false);
  const [Editing, setEditing] = useState();
  const DropdownOptions = [
    'Button', 'Text'
  ];
  const defaultOption = DropdownOptions[0];



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

  const OnEditSubquestionClicked = (index, id) => {
    setSelectedSubQuestion(id);
    axios
      .get(`http://localhost:3001/getOption${index}/${id}`)
      .then((response) => {
        setOptions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
        console.log(index, id);
      });
  };

  const ClearQuestionSelected = () => {
    setSelectedQuestion('');
  }

  const ClearSubquestionSelected = () => {
    setSelectedSubQuestion('');
  }

  const OpenEditModal = (id) => {
    setEditmodal(true);
    setEditing(id);
    console.log("OpenEdit" + id)
  };

  const CloseEditModal = (id) => {
    setEditmodal(false);
    setEditing();
    console.log("CloseEdit" + id)
  };

  const OpenAddModal = (id) => {
    setAddmodal(true);
    setEditing(id);
    console.log("OpenAdd" + id)
  };

  const CloseAddModal = (id) => {
    setAddmodal(false);
    setEditing();
    console.log("CloseAdd" + id)
  };

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
    <>
      {SelectedQuestion === "" ? (
        questions.map((e) => (
          <div className="admin-edit-container" key={e.question_id}>
            <div className="info-left">
              <p className="question-title" onDoubleClick={() => OpenEditModal(e.question_id)}>
                {e.question_text}
              </p>
              {EditModal && (
                <div className="modal">
                  <div className="overlay-modal" onClick={CloseEditModal}></div>
                  <div className="modal-content">
                    <h2>แก้ไขข้อมูล</h2>
                    <input
                      type="text"
                      className="edit-title"
                      placeholder={questions[Editing - 1].question_text}
                    />
                    <button className="close-modal" onClick={CloseEditModal}>
                      ปิด
                    </button>
                    <button className="confirm-btn" onClick={CloseEditModal}>
                      ยืนยัน
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="info-right">
              <div className="edit">
                <button
                  className="edit-btn"
                  onClick={() => OnEditquestionClicked(e.question_id)}
                >
                  แก้ไขข้อมูล
                </button>
                <span className="space">|</span>
                <button
                  className="edit-btn"
                  onClick={() => {
                    console.log(SelectedQuestion);
                  }}
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        ))
      ) : SelectedSubquestion === "" ? (
        <div className="subquestion-page" style={{ overflow: "hidden" }}>
          <div className="top-page">
            <div
              className="add-question-button"
              onClick={ClearQuestionSelected}
            >
              ย้อนกลับ
            </div>
            <div className="add-question-button" onClick={() => OpenAddModal(SelectedQuestion)}>
              <FaPlus size={10} color="white" /> เพิ่มคำถาม
            </div>
          </div>

          <div className="all-subquestion">
            {sub_questions.map((e) => {
              return (
                <div className="subquestion-container" key={e.sub_question_id}>
                  <div className="info-left">
                    <button
                      className="question-title"
                      onDoubleClick={() => OpenEditModal(e.sub_question_id)}
                    >
                      {e.sub_question_text}
                    </button>
                    {AddModal && (
                      <div className="modal">
                        <div
                          className="overlay-modal"
                          onClick={CloseAddModal}
                        ></div>
                        <div className="modal-content">
                          <h2>เพิ่มคำถาม</h2>
                          <input
                            type="text"
                            className="edit-title"
                            placeholder='คำถาม'
                          />
                          <h3>ชนิดของคำถาม</h3>
                          <Dropdown className="dropdown" options={DropdownOptions} value={defaultOption} placeholder="Select an option" />
                          <br/>
                          <button className="close-modal" onClick={CloseAddModal}>
                            ปิด
                          </button>
                          <button className="confirm-btn" onClick={CloseAddModal}>
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    )}
                    {EditModal && (
                      <div className="modal">
                        <div
                          className="overlay-modal"
                          onClick={CloseEditModal}
                        ></div>
                        <div className="modal-content">
                          <h2>แก้ไขข้อมูล</h2>
                          <input
                            type="text"
                            className="edit-title"
                            placeholder={sub_questions[Editing - 1].sub_question_text}
                          />
                          <button className="close-modal" onClick={CloseEditModal}>
                            ปิด
                          </button>
                          <button className="confirm-btn" onClick={CloseEditModal}>
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="info-right">
                    <div className="edit">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          OnEditSubquestionClicked(
                            SelectedQuestion,
                            e.sub_question_id
                          )
                        }
                      >
                        แก้ไขข้อมูล
                      </button>
                      <span className="space">|</span>
                      <button
                        className="edit-btn"
                        onClick={() => {
                          console.log(SelectedQuestion);
                        }}
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="option-page">
          <div className="top-page">
            <div
              className="add-question-button"
              onClick={ClearSubquestionSelected}
            >
              ย้อนกลับ
            </div>
            <div className="add-question-button">
              <FaPlus size={10} color="white" /> เพิ่มคำถาม
            </div>
          </div>

          <div className="all-subquestion">
            {options.map((e) => {
              return (
                <div className="subquestion-container" key={e.option_id}>
                  <div className="info-left">
                    <button
                      className="question-title"
                      onDoubleClick={() => OpenEditModal(e.option_id)}
                    >
                      {e.option_text}
                    </button>
                    {EditModal && (
                      <div className="modal">
                        <div
                          className="overlay-modal"
                          onClick={CloseEditModal}
                        ></div>
                        <div className="modal-content">
                          <h2>แก้ไขข้อมูล</h2>
                          <input
                            type="text"
                            className="edit-title"
                            placeholder={options[Editing - 1].option_text}
                          />
                          <button className="close-modal" onClick={CloseEditModal}>
                            ปิด
                          </button>
                          <button className="confirm-btn" onClick={CloseEditModal}>
                            ยืนยัน
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="info-right">
                    <div className="edit">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          console.log(SelectedQuestion);
                        }}
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}