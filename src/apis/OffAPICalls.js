
/* 추후 작성 */
/* 모든 근태 목록 조회 */
export const callAbsListAPI = ({ currentPage = 1 }) => {
    const requestURL = `${PRE_URL}/abs-admin?page=${currentPage}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL);
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