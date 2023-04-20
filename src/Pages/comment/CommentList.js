import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment, addComment, deleteComment, updateComment } from "../../apis/CommentAPI";
import CommentReducer from "../../modules/comment";

//댓글 리스트 시작
function CommentList({issueNo}) {

  const [value, setValue] = useState('');
  const [update, setUpdate] = useState(null);

  const comments = useSelector(state => state.CommentReducer);

  const dispatch = useDispatch();

  useEffect(
    () => {
    dispatch(getComment(issueNo));
  },
   [comments]
   );

  // console.log(issueNo) 작동하는지 확인용

  const handleClick = (index, event) => {
    setValue(event.target.innerHTML);
    setUpdate(index);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  //댓글 수정
  const updateKeyDown = (key, event) => {
    if (event.key !== 'Enter') return;

    const modifyComment = comments[key];

    setUpdate();
    dispatch(updateComment({...modifyComment, replyContent: value}));
    dispatch(getComment(issueNo));
  };

  //댓글 삭제
  const deleteList = (no) => {
    dispatch(deleteComment(no));
    dispatch(getComment(issueNo));
  };



  const rendList = () => {
    if (!comments) return null;

    return comments.map((item, key) => 
        <div className='comment-row' key={key} style={{ display: 'flex', alignItems: 'center' }}>
          <div className='comment-id' style={{ marginRight: '1rem' }}>{item.employeeNo}</div>
          <div className='comment-content' style={{ flex: 1 }}>
            {/* 댓글 수정 */}
            {update === key ? (
              <input
                type='text'
                value={value}
                onChange={handleChange}
                onKeyDown={(event) => updateKeyDown(key, event)}
                className='comment-update-input'
              />
            ) : (
              <>
                <span onClick={(event) => handleClick(key, event)}>{item.replyContent}</span>
                {/* 댓글삭제 */}
                <button
                type="button"
                  className='btn btn-danger btn-icon-split icon text-white-50 fas fa-trash btn-sm'
                  onClick={()=>deleteList(item.replyNo)}
                >
                  삭제
                </button>
              </>
            )}
          </div>

          {/* 댓글 날짜 */}
          <div className='comment-date' style={{ marginLeft: '1rem' }}>{(item.replyDate)}</div>
        </div>
      );
  };
  return <div>{rendList()}</div>;
}


export default CommentList;