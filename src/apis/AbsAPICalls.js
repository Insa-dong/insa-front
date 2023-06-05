import { getAbss, putAbss, getAbsDate, getMyabs, postCheckin, putCheckout } from "../modules/AbsModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/abs`;



/* 모든 근태 목록 조회 */
export const callAbsListAPI = ({ currentPage = 1 }) => {
  const requestURL = `${PRE_URL}/abs-admin?page=${currentPage}`;
  const accessToken = window.localStorage.getItem('accessToken');

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        dispatch(getAbss(result));
      } else {
        console.log('[callAbsListAPI] Error:', result.error);
      }
    } catch (error) {
      console.log('[callAbsListAPI] Error:', error);
    }
  };
};

/* 근태 수정 */
export const callModifyAbsAPI = (formData) => {
  const requestURL = `${PRE_URL}/abs-admin`;

  return async (dispatch, getState) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const body = JSON.stringify(formData);

    try {
      const response = await fetch(requestURL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: body
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(putAbss(result));

        // abs 수정이 성공하면, 전체 abs 리스트를 다시 가져옵니다.
        dispatch(callAbsListAPI({ currentPage: 1 }));
      } else {
        console.log('[callModifyAbsAPI] Error:', result.error);
      }
    } catch (error) {
      console.log('[callModifyAbsAPI] Error:', error);
    }
  };
};




/* 모든 근태 날짜 조회 */
export const callAbsDateAPI = ({ absDate, currentPage = 1 }) => {

  const requestURL = `${PRE_URL}/abs-admin/${absDate}?page=${currentPage}`;
  const accessToken = window.localStorage.getItem('accessToken');

  return async (dispatch, getState) => {
    try {
        // fetch 요청시 headers에 'Authorization' 헤더 추가
        const response = await fetch(requestURL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const result = await response.json();

        if (response.ok) {
            dispatch(getAbsDate(result));
        } else {
            console.log('[callAbsDateAPI] Error:', result.error);
        }
    } catch (error) {
        console.log('[callAbsDateAPI] Error:', error);
    }
};
};

/* 내 근태 조회 */
export const callMyAbsListAPI = ({ currentPage = 1 }) => {

  const requestURL = `${PRE_URL}/abs-myAbs?page=${currentPage}`;

  return async (dispatch, getState) => {

    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
      }
    }).then(response => response.json());


    if (result.status === 200) {
      dispatch(getMyabs(result));
    }
  }
}

/* 출근하기 API */
export const callCheckInAPI = () => {
  const requestURL = `${PRE_URL}/checkIn`;

  return async (dispatch, getState) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const myAbsList = getState().absReducer.data || [];

    if (myAbsList.some(abs => abs.absEnd === null)) {
      // 이미 출근한 상태인 경우 경고창 표시 후 Promise.reject() 반환
      return Promise.reject(new Error('이미 출근했습니다'));
    }

    const result = await fetch(requestURL, {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    }).then(response => response.json());

    if (result.status === 200) {
      // 결과를 전달하면서 액션 객체 생성
      dispatch(callMyAbsListAPI({ currentPage: 1 }));
    } else {
      throw new Error(result.error); // 실패한 경우 오류 throw
    }
  };
};

/* 퇴근하기 API */
export const callCheckOutAPI = () => {
  const requestURL = `${PRE_URL}/checkOut`;

  return async (dispatch, getState) => {
    const accessToken = window.localStorage.getItem('accessToken');

    try {
      const response = await fetch(requestURL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      });

      const result = await response.json();

      if (response.ok) {
        // 퇴근 성공 시 내 근태 조회 API를 호출하여 업데이트된 내 근태를 가져옵니다.
        dispatch(callMyAbsListAPI({ currentPage: 1 }));
        return Promise.resolve(); // 퇴근 성공을 알리기 위해 Promise.resolve()를 반환합니다.
      } else {
        return Promise.reject(result); // 퇴근 실패 시 오류를 알리기 위해 Promise.reject()를 반환합니다.
      }
    } catch (error) {
      console.log('[callCheckOutAPI] Error:', error);
      return Promise.reject(error); // 예기치 않은 오류가 발생한 경우 오류를 알리기 위해 Promise.reject()를 반환합니다.
    }
  };
};











