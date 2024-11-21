import api from './api';

export const login = (id, password) => {
  const formData = new FormData(); // FormData 객체 생성
  formData.append('username', id); // id를 username으로 추가
  formData.append('password', password); // password 추가

  return api.post('/login', formData, {
    withCredentials: true
  }); // 로그인 요청 전송
};

export const join = (id, password, name, phone, email, type) => {
  const formData = new FormData(); // FormData 객체 생성

  // 데이터 추가
  formData.append('data', new Blob([JSON.stringify({
      userId: id,
      userPassword: password,
      userName: name,
      userPhone: phone,
      userEmail: email,
      userType: type
  })], { type: 'application/json' })); // JSON 객체를 Blob으로 변환하여 추가

  return api.post('/join', formData); // Content-Type 설정 없음
};

export const updateUser = (password, email, token) => {
  const formData = new FormData();
  formData.append('data', new Blob([JSON.stringify({
    userPassword: password,
    userEmail: email
})], { type: 'application/json' }));

return api.patch('/update', formData, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});
}

export const getReviewByUser = (token) => {

  return api.patch('/review', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

