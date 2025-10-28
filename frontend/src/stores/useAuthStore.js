import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { loginApi, registerApi } from "../services/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,
      loading: false,

      // 🔹 Đăng ký
      register: async (username, password, full_name, email, phone, apartment_code) => {
        try {
          set({ loading: true });
          console.log('Registering user:', {
        username,
        password,
        full_name,
        email,
        phone,
        apartment_code
      })
          await registerApi(
            username,
            password,
            full_name,
            email,
            phone,
            apartment_code
          );
          toast.success("Registration successful! Please log in.");
        } catch (error) {
          console.error("Registration error:", error);
          toast.error("Registration failed. Please try again.");
        } finally {
          set({ loading: false });
        }
      },

      // 🔹 Đăng nhập
      login: async (username, password) => {
        try {
          set({ loading: true });
          const res = await loginApi(username, password);

          set({
            accessToken: res.data.token,
            isAuthenticated: true,
            user: res.data.user,
          });

          toast.success("Login successful!");
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Login failed. Please check your credentials and try again.");
        } finally {
          set({ loading: false });
        }
      },

      // 🔹 Đăng xuất
      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null,
        });
        localStorage.removeItem("access_token");
        toast.success("Logged out successfully.");
      },
    }),

    {
      name: "access_token",
      serialize: (state) => state.state.accessToken || "",
      deserialize: (str) => ({
        state: { accessToken: str || null },
        version: 0,
      }),
    }
  )
);
