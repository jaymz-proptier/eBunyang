import React, { useEffect, useState } from "react";



const qnaTitle = {
	fontSize : "22px",
    lineHeight : "32px",
    fontWeight : "650",
}

const windowWidth = window.innerWidth;
const backStyle = {
	backgroundColor: "white",
	border: "solid 1px #d3cecc",
	borderRadius: "4px",
	margin: "auto",
	marginTop: "50px",
	marginBottom: "50px",
	padding: "40px",
	width: windowWidth >= 680 ? "560px" : "320px",
};

const starStyle = {
	color :	"#f98342",
}

const radioStyle = {
	accentColor :	"#f98342",
}

const inputStyle = {
	display : "block",
    padding : "10px",
    border : "solid 1px #d3cecc",
    cursor : "pointer",
    fontSize : "14px",
    lineHeight : "16px",
    width : "100%",
    margin : "auto",
    overflow : "hidden",
    textOverflow : "ellipsis",
    whiteSpace : "nowrap",
	borderRadius : "4px",
}

const divStyle1 = {
	marginTop : "20px",
	paddingBottom : "5px",
}

const divStyle2 = {
	marginTop : "35px",
	paddingBottom : "5px",
}

const divStyle3 = {
	float : "left",
}

const divStyle4 = {
	float : "left",
}

const textAreaStyle = {
	display : "block",
    padding : "10px",
    border : "solid 1px #d3cecc",
    cursor : "pointer",
    fontSize : "14px",
    lineHeight : "20px",
    width : "100%",
    margin : "auto",
    overflow : "hidden",
    textOverflow : "ellipsis",
    whiteSpace : "nowrap",
	height : "160px",
	borderRadius : "4px",
}

const fileAddStyle = {
	fontSize : "12px",
	padding : "22px 0 0 74px",
    lineHeight : "16px",
}

const checkLabel = {
	fontSize : "14px",
    cursor : "pointer",
}

const checkText = {
    cursor : "pointer",
}

const footDiv = {
	width : "100%",
	height : "50px",
}

const qnaBtn = {
    cursor : "pointer",
	marginTop : "16px",
	width : "100%",
	height : "50px",
	backgroundColor : "#f98342",
	color : "#ffffff",	
    fontWeight : "600",
	fontSize : "16px",
}

const qnaOkBtn = {
    cursor : "pointer",
	marginTop : "16px",
	width : "100%",
	height : "50px",
	backgroundColor : "#f98342",
	color : "#ffffff",	
    fontWeight : "600",
	fontSize : "16px",
}
	
const fileAddBtn = {
	border : "2px solid black",
	padding : "0 10px 0 10px",	
	borderRadius : "0px",
	margin : "10px 0 0 18px",
    cursor : "pointer",
	background : "black",
	color : "white",
	fontSize : "12px",
}

const textareaLength = {
	float : "right",
}

const fileBtn = {
	background : "white",
}
	
//modal style
const styles = {
	modalOverlay: {
		position:'fixed',
		top:'0',
		left:'0',
		right:'0',
		bottom:'0',
		backgroundColor:'rgba(0, 0, 0, 0.75)',
		zIndex:'9999',
	},
	modal: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '77777',
		width: '420px',
		background: '#fff',
		borderRadius: '0px',
		padding: '50px 0px 20px 0',
		height: '200px',
		minWidth: '420px',
		textAlign : 'center',
	},
	h1 : {
		fontSize:'20px',
		fontWeight:'500',
		lineHeight:'26px',
		textAlign:'center',
		borderBottom:'solid 0px #e2ddda',
		padding:'8px 0 24px',
		color:"black",
		margin:"0px 0px 0px 0px",
	},
	copyBtnWrap:{
		display:'block',
		background:'#f6f4f2',
		margin:'0 0 0 64px',
		padding:'10px',
		border:'solid 1px #d3cecc',
		cursor:'pointer',
		fontSize:'14px',
		lineHeight:'20px',
		width:'73%',
		overflow:'hidden',
		textOverflow:'ellipsis',
		whitSpace:'nowrap',
	},
	closeBtn : {
		background:'white',
		backgroundImage:'url("https://www.ebunyang.co.kr/public/images/MSbg_ver02.svg")',
		backgroundPosition:'-120px  -200px',
		width:'24px',
		height:'24px',
		float:'right',	
	},
};
//파일 업로드 허용 확장자
const allowedExtensions = ["jpeg", "jpg", "gif", "png", "pdf"];

//인풋 정규식 패턴 검증
function validateInput(value) {
  const regex = /^[a-zA-Z0-9가-힣\s]*$/; // 정규식 패턴
  return regex.test(value); // 입력된 값이 패턴과 일치하는지 검증
}

//이메일 형식 검증
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

//휴대폰번호 숫자만 입력
function handleKeyDown(event) {
	const { value } = event.target;
	event.target.value = value.replace(/[^0-9]/g, '');
}


function SYproposal() {
    

	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		window.location.href="http://localhost:8080/";
	};


	//미디어 쿼리용
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width : 560px)");

		const handleMediaQuery = () => {
			// handle media query
			if(document.querySelector(".contentWrap")){
				if (mediaQuery.matches) {
					document.querySelector(".contentWrap").style.width = "100%";
					document.querySelector(".contentWrap").style.minWidth = "320px";
				} else {
					// 680px 초과일 때, 기존 CSS로 돌아가도록 설정
					document.querySelector(".contentWrap").style.width = "680px";
				}
			}
		};

		// Add media query listener when component mounts
		mediaQuery.addListener(handleMediaQuery);

		// Remove media query listener when component unmounts
		return () => {
			if(handleMediaQuery){
				mediaQuery.removeListener(handleMediaQuery);
			}
		};

	}, []);

	//내용
	const [content, setContent] = useState('');
	function handleContentChange(e) {
		setContent(e.target.value);
	}

	///////////////////////////
	//파일업로드 작업 필요
	///////////////////////////
	const [files, setFiles] = useState([]);

	//문의하기 입력값
	const [comp_nm,   setCompNm] = useState("");
	const [comp_url,  setCompUrl] = useState("");
	const [name,      setName] = useState("");
	const [email,     setEmail] = useState("");
	const [mobile_no, setMobileNo] = useState("");
	const [memo,      setMemo] = useState("");
	const [group_cd,  setGroupcd] = useState("AD01");

	//60초에 한번 가능
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [canSubmit, setCanSubmit] = useState(true);
	
	//라디오 버튼 값
	const handleRadioChange = (e) => {
		setGroupCd(e.target.value);
	};		

	//문의하기 완료 레이어 팝업
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 문의하기 버튼
	const handleSubmit = (e) => {
		e.preventDefault();
	
		//데이터 호출
		const comp_nm = document.querySelector('input[name="comp_nm"]');
		const name = document.querySelector('input[name="name"]');
		const mobile_no = document.querySelector('input[name="mobile_no"]'); 
		const pInformation = document.querySelector('input[name="pInformation"]'); 
		const email = document.querySelector('input[name="email"]');
		const comp_url = document.querySelector('input[name="comp_url"]'); 
	
		//폼데이터 저장
		const formData = new FormData();
		formData.append("comp_nm", comp_nm.value);//필수
		formData.append("comp_url", comp_url.value);
		formData.append("name", name.value);//필수
		formData.append("email", email.value);
		formData.append("mobile_no", mobile_no.value);//필수
		formData.append("memo", memo);
		formData.append("group_cd", group_cd);//필수
		
		// 파일 추가
		files
		.filter(file => allowedExtensions.includes(file.name.split(".").pop().toLowerCase()))
		.slice(0, 3) // 최대 3개까지 추가 가능하도록 설정
		.forEach((file, index) => {
		formData.append(`upfile${index + 1}`, file);
		});


		//필수값 입력 여부 검증
		if(comp_nm.value == ""){
			window.alert("회사명을 입력해주세요.");
			comp_nm.focus();
			return;
		}else if(name.value == ""){
			window.alert("담당자를 입력해주세요.");
			name.focus();
			return;
		}else if(mobile_no.value == ""){
			window.alert("연락처를 입력해주세요.");
			mobile_no.focus();
			return;
		}else if(email.value == ""){
			window.alert("이메일을 입력해주세요.");
			email.focus();
			return;
		}else if(pInformation.checked == false){
			window.alert("개인정보 수집 및 이용동의 해주세요.");
			pInformation.focus();
			return;

		//입력값 유효성 검증
		}else if (validateInput(comp_nm.value) == false) {
			window.alert("회사명은 알파벳, 숫자, 한글만 입력 가능합니다.");
			comp_nm.focus();
			return; 
		}else if (validateInput(name.value) == false) {
			window.alert("담당자는 알파벳, 숫자, 한글만 입력 가능합니다.");
			name.focus();
			return;
		}else if (validateInput(mobile_no.value) == false) {
			window.alert("연락처는 숫자만 입력 가능합니다.");
			mobile_no.focus();
			return; 
		}else if (email.value != "" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value) == false ){
			window.alert("올바른 이메일 형식이 아닙니다.");
			email.focus();
			return; 
		}else if (comp_url.value != "" && /^(ftp|http|https):\/\/[^ "]+$/.test(comp_url.value) == false){
			window.alert("올바른 URL 형식이 아닙니다.");
			comp_url.focus();
			return; 
		}

		//10초에 한번 보낼 수 있다
		if (canSubmit==false) {
			alert('1분에 한번 문의 가능합니다.');
			return;
		}
		setIsSubmitting(true); // 버튼 비활성화
		setCanSubmit(false); // 10초간 요청 불가능 상태로 변경

		// AJAX 요청 보내기
		fetch('https://test-api.ebunyang.co.kr/v2/board/online', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('서버 응답 오류');
			}
			return response.json();
		})
		.then(data => {
			console.log('서버 응답:', data);
			setIsModalOpen(true);
		})
		.catch(error => {
			console.error('AJAX 에러:', error);
		})
		.finally(() => {
			setTimeout(() => {
				setCanSubmit(true); // 요청 가능한 상태로 변경
			}, 60000); // 60초 대기
			setIsSubmitting(false); // 버튼 활성화
		});
	};

	return (
			<div className="contentWrap" style={backStyle}>
				<form method="post" name="qnaForm" onSubmit={handleSubmit}>
				<div>
					<div>
						<span style={qnaTitle}> 광고·제휴 문의 </span>
					</div>
					<div style={divStyle1}>
						문의유형<span style={starStyle}>*</span> 
					</div>
					<div style={checkLabel}>
						<label>
							<input type="radio" name="group_cd" value="AD01" checked={group_cd === "AD01"} onChange={(e) => setGroupcd(e.target.value)} style={radioStyle}/>
							<span style={checkText}> 현장방문 광고</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</label>
						<label>
							<input type="radio" name="group_cd" value="AD02" checked={group_cd === "AD02"} onChange={(e) => setGroupcd(e.target.value)} style={radioStyle}/>
							<span style={checkText}> 입주탐방 광고</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</label>
						<label>
							<input type="radio" name="group_cd" value="AD03" checked={group_cd === "AD03"} onChange={(e) => setGroupcd(e.target.value)} style={radioStyle}/>
							<span style={checkText}> 제휴</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</label>
						<label>
							<input type="radio" name="group_cd" value="AD04" checked={group_cd === "AD04"} onChange={(e) => setGroupcd(e.target.value)} style={radioStyle}/>
							<span style={checkText}> 기타</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</label>
					</div>	 
					<div style={divStyle1}>
						회사명<span style={starStyle}>*</span>
					</div>
					<div>
						<input type="text" style={inputStyle} placeholder="회사명을 입력하세요." name="comp_nm" value={comp_nm} onChange={(e) => setCompNm(e.target.value)} />
					</div>  	
					
					<div style={divStyle1}>
						담당자<span style={starStyle}>*</span>
					</div>
					<div>
						<input type="text" style={inputStyle} placeholder="이름" name="name" value={name} onChange={(e) => setName(e.target.value)} />
					</div>  
					<div style={divStyle1}>
						연락처 (-제외)<span style={starStyle}>*</span>
					</div>
					<div>
						<input type="text" style={inputStyle} placeholder="01012345678" name="mobile_no" value={mobile_no} onChange={(e) => setMobileNo(e.target.value)} />
					</div>  	
					<div style={divStyle1}>
						이메일<span style={starStyle}>*</span>
					</div>
					<div>
						<input type="text" style={inputStyle} placeholder="abc1234@naver.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>  	
					<div style={divStyle1}>
						회사 URL
					</div>
					<div>
						<input type="text" style={inputStyle} placeholder="https://www.ebunyang.com" name="comp_url" onKeyUp={handleKeyDown} onKeyDown={handleKeyDown} value={comp_url} onChange={(e) => setCompUrl(e.target.value)} />
					</div>
					<div style={divStyle1}>
						내용
					</div>
					<div>
						<textarea style={textAreaStyle} placeholder="문의 내용을 입력하세요." name="memo" onKeyUp={handleContentChange} onKeyDown={handleContentChange} value={memo} onChange={(e) => setMemo(e.target.value)} maxLength={12000}/>
						<span style={textareaLength}>{content.length}/12,000</span>
					</div>
					<div style={divStyle2}>
						<div style={divStyle3}>
							파일첨부	
						</div>
						<div style={divStyle4}>
							<label className="input-file-button" htmlFor="input-file" style={fileAddBtn}>
								&nbsp; 파일 선택 &nbsp;
							</label>
							<input type="file" id="input-file" style={{display:"none",}} name="upfile" multiple 	
								onChange={(event) => {
									const selectedFiles = Array.from(event.target.files);
									const allowedExtensions = ["jpg", "jpeg", "png", "gif", "pdf"];
									const maxFileSize = 5 * 1024 * 1024; // 5MB
									const filteredFiles = selectedFiles.filter((file) =>
										allowedExtensions.includes(file.name.split(".").pop().toLowerCase()) && file.size <= maxFileSize
									);
									const filesLength = files ? files.length : 0;
									const newFiles = filteredFiles.slice(0, 3 - filesLength);
									const updatedFiles = [...files, ...newFiles].slice(-3);
									setFiles(updatedFiles);
								}}
							/>
						</div>
					</div>
					<div style={fileAddStyle}>
						첨부파일 용량은 파일당 5MB를 초과하실 수 없으며, 최대 3개까지 등록하실 수 있습니다. 이미지(jpeg, gif, png) 파일을 첨부할 수 있습니다.
								
							{files.filter(file => allowedExtensions.includes(file.name.split(".").pop().toLowerCase())).map((file, index) => (
							<div key={index}>
								{file.name}&nbsp;
								<button type="button" style={fileBtn} onClick={() => {
									const filteredFiles = files.filter((_, i) => i !== index);
									setFiles(filteredFiles);
								}}> x </button>
							</div>
						))}
					</div>
					<div style={divStyle1}>
						<label style={{cursor : "pointer"}}>
							<input type="checkbox" name="pInformation"/> (필수) 개인정보 수집 및 이용동의
						</label>
					</div>
					<input type="submit" style={qnaBtn} value="문의하기" disabled={isSubmitting}/>
				</div>
				</form>

			<div style={{ display: isModalOpen ? 'block' : 'none' }}>
				<button type="button" className="share" onClick={openModal}><i className="Icon_share"></i></button>
					<div className="modal-overlay" style={styles.modalOverlay} >
						<div className="modal" style={{ ...styles.modal, ...(isMobile && styles.modalMobile) }}>
							<h1 style={styles.h1}>
								<span>문의가 접수되었습니다.<br/>빠른 시일내에 연락 드리도록 하겠습니다.</span>
							</h1>
							<input type="submit" style={qnaOkBtn} value="확인" onClick={closeModal}/>
						</div>
					</div>
			</div>
		</div>
	);
}

export default SYproposal;