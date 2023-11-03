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
  const [Input, setInput] = useState("");
  const [Type, setType] = useState("");
  const sub_q_id = sub_questions.length + 1;
  const op_id = options.length + 1;
  const DropdownOptions = [
    'button', 'text'
  ];



  const OnEditquestionClicked = (index, id) => {
    setSelectedQuestion(id);
    axios.get(`http://localhost:3001/getSubquestion${index}/${id}`)
      .then((response) => {
        setSubQuestions(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล', error);
        console.log(index, id);
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

  const OnAddSubquestionClicked = () => {
    axios
      .post(`http://localhost:3001/addSubquestion${SelectedQuestion}`, 
      { 
        question_id: SelectedQuestion,
        sub_question_id: sub_q_id,
        sub_question_text: Input,
        sub_question_type: Type })
      .then((response) => {
        CloseAddModal()
        setSubQuestions([
          ...sub_questions,
          {
            question_id: SelectedQuestion,
            sub_question_id: sub_q_id,
            sub_question_text: Input,
            sub_question_type: Type
          }
        ])
        // window.location.reload();
        console.log(response, SelectedQuestion, Input, Type);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
        console.error(Input)
        console.error(Type)
      });
  }

  const OnDeleteSubQclicked = (index, id) => {
    axios.delete(`http://localhost:3001/deleteSubquestion${index}/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("ลบข้อมูลสำเร็จ");
          setSubQuestions(sub_questions.filter(subQuestion => subQuestion.sub_question_id !== id));
        } else {
          console.error("เกิดข้อผิดพลาดในการลบข้อมูล");
        }
      })
      .catch(error => {
        console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
      });
  }

  const OnUpdateSubQclicked = (index, id) => {
    axios.put(`http://localhost:3001/UpdateSubquestion${index}/${id}`,
    {
      sub_question_text: Input
    })
    .then(response => {
      CloseEditModal()
      window.location.reload();
      if (response.status === 200) {
        console.log("อัพเดทข้อมูลสำเร็จ");
      } else {
        console.error("เกิดข้อผิดพลาดในการอัพเดทข้อมูล");
      }
    })
    .catch(error => {
      console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
    });
  }

  const OnAddOptionClicked = () => {
    axios
      .post(`http://localhost:3001/addOption${SelectedQuestion}`, 
      { 
        question_id: SelectedQuestion,
        sub_question_id: SelectedSubquestion,
        option_text: Input })
      .then((response) => {
        CloseAddModal()
        setOptions([
          ...options,
          {
            question_id: SelectedQuestion,
            sub_question_id: SelectedSubquestion,
            option_text: Input
          }
        ])
        // window.location.reload();
        console.log(response, SelectedQuestion, SelectedSubquestion, Input);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
        console.error( SelectedQuestion, SelectedSubquestion, Input)
      });
  }

  const OnDeleteOptionclicked = (index, id) => {
    axios.delete(`http://localhost:3001/deleteOption${index}/${id}`)
      .then(response => {
        if (response.status === 200) {
          console.log("ลบข้อมูลสำเร็จ");
          setOptions(options.filter(Option => Option.option_id !== id));
        } else {
          console.error("เกิดข้อผิดพลาดในการลบข้อมูล");
        }
      })
      .catch(error => {
        console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
      });
  }

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

  const CloseEditModal = () => {
    setEditmodal(false);
    setEditing();
  };

  const OpenAddModal = (id) => {
    setAddmodal(true);
    setEditing(id);
    console.log("OpenAdd" + id)
  };

  const CloseAddModal = () => {
    setAddmodal(false);
    setEditing();
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
    // axios.get(`http://localhost:3001/getSubquestion`)
    //   .then((response) => {
    //     setAllsubquestions(response.data)
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.error('เกิดข้อผิดพลาดในการดึงข้อมูล', error);
    //   });
  }, []);

  return (
    <>
      {SelectedQuestion === "" ? (
        questions.map((e) => (
          <div className="admin-edit-container" key={e.question_id}>
            <div className="info-left">
              <p className="question-title">
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
                  onClick={() => OnEditquestionClicked(e.question_id,e.question_id)}
                >
                  แก้ไขข้อมูล
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
                            onChange={(e) => setInput(e.target.value)}
                            value={Input}
                          />
                          <h3>ชนิดของคำถาม</h3>
                          <Dropdown
                            className="dropdown"
                            options={DropdownOptions}
                            value={Type}
                            placeholder="Select an option"
                            onChange={(option) => {
                              setType(option.value)
                            }}
                          />
                          <br />
                          <button className="close-modal" onClick={CloseAddModal}>
                            ปิด
                          </button>
                          <button className="confirm-btn" onClick={() => OnAddSubquestionClicked()}>
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
                            onChange={(e) => setInput(e.target.value)}
                            value={Input}
                          />
                          <button className="close-modal" onClick={CloseEditModal}>
                            ปิด
                          </button>
                          <button className="confirm-btn" onClick={()=>{OnUpdateSubQclicked(e.question_id,e.sub_question_id)}}>
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
                          // {console.log(SelectedQuestion,e.sub_question_id)}
                        }
                      >
                        แก้ไขข้อมูล
                      </button>
                      <span className="space">|</span>
                      <button
                        className="edit-btn"
                        onClick={() => { OnDeleteSubQclicked(e.question_id,e.sub_question_id) }}
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
            <div className="add-question-button" onClick={() => OpenAddModal(SelectedQuestion)}>
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
                    >
                      {e.option_text}
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
                            onChange={(e) => setInput(e.target.value)}
                            value={Input}
                          />
                          <button className="close-modal" onClick={CloseAddModal}>
                            ปิด
                          </button>
                          <button className="confirm-btn" onClick={() => OnAddOptionClicked()}>
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
                        onClick={() => { OnDeleteOptionclicked(e.question_id,e.option_id) }}
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