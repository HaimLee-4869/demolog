import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/Auth';

// AuthService 인스턴스 생성
const authService = new AuthService();

// 비동기 Thunk 생성: 로그인
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await authService.tryLogin(email, password, true); // 로그인
      return user;
    } catch (err) {
      return rejectWithValue(err.message || '로그인에 실패했습니다.');
    }
  }
);

// 비동기 Thunk 생성: 회원가입
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await authService.tryRegister(email, password); // 회원가입
      return { email }; // 성공적으로 등록된 사용자 이메일 반환
    } catch (err) {
      return rejectWithValue(err.message || '회원가입에 실패했습니다.');
    }
  }
);

// 초기 상태 설정
const initialState = {
  isAuthenticated: false,  // 혹은 Kakao 토큰 검사하거나, DB 사용자 로그인 여부
  user: null,
  loading: false,
  error: null,
};

// 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그아웃 액션
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      // Kakao 연동 시에는 Kakao.Auth.logout() 등을 호출하거나
      // localStorage.removeItem('kakao_access_token');
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인 Thunk
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // 회원가입 Thunk
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // 회원가입 성공 후 추가 작업이 필요하다면 여기에 작성
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 액션과 리듀서를 내보냅니다.
export const { logout } = authSlice.actions;
export default authSlice.reducer;