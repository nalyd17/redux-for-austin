import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface Practice {
  clientId: string;
  practiceId: string;
  category: string;
  createdAt: number;
  evidence: string[];
  response: string;
  status: string;
  updatedAt: number;
}

interface PracticesState {
  practices: Practice[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PracticesState = {
  practices: [],
  status: "idle",
  error: null,
};

export const fetchPractices = createAsyncThunk<Practice[], string>(
  "practices/fetchPractices",
  async (clientId) => {
    const response = await axiosInstance.get(`/practices`, {
      params: { clientId },
    });
    return response.data.practices;
  }
);

export const updatePractice = createAsyncThunk<Practice, Practice>(
  "practices/updatePractice",
  async (practice) => {
    const response = await axiosInstance.put(`/practices`, practice);
    return response.data;
  }
);

const practicesSlice = createSlice({
  name: "practices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchPractices
      .addCase(fetchPractices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPractices.fulfilled,
        (state, action: PayloadAction<Practice[]>) => {
          state.status = "succeeded";
          state.practices = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchPractices.rejected, (state, action) => {
        state.status = "failed";
        state.practices = [];
        state.error = action.error.message || "Failed to fetch practices";
      })
      // Handle updatePractice
      .addCase(updatePractice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updatePractice.fulfilled,
        (state, action: PayloadAction<Practice>) => {
          state.status = "succeeded";
          const updatedPractice = action.payload;
          state.practices = state.practices.map((practice) =>
            practice.practiceId === updatedPractice.practiceId
              ? updatedPractice
              : practice
          );
        }
      )
      .addCase(updatePractice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update practice";
      });
  },
});

export default practicesSlice.reducer;
