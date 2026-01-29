import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/store/Api/Auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/Slices/AuthSlice/authSlice";
import { UserRole } from "@/types/dashboard.types";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/store/Slices/AuthSlice/authSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data).unwrap();
      
      // Assuming response has accessToken. Adjust if nested.
      const { accessToken, refreshToken } = response.data || response; 

      if (accessToken) {
        dispatch(setUser({ accessToken, refreshToken }));
        
        // Decode to find role for redirection
        const decoded = jwtDecode<DecodedToken>(accessToken);
        
        // Redirect based on role
        switch (decoded.role) {
          case UserRole.ADMIN:
            navigate("/dashboard/admin");
            break;
          case UserRole.MAIN_LEADER:
          case UserRole.CO_LEADER:
          case UserRole.FRONTEND_LEADER:
          case UserRole.BACKEND_LEADER:
          case UserRole.PROJECT_LEAD:
            navigate("/dashboard/leads");
            break;
          case UserRole.TEAM_MEMBER:
            navigate("/dashboard/team");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      // specific error handling if possible
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message Display (Optional) */}
          
          <div className="flex justify-between items-center text-sm">
             <Link to="/forgot-password" className="text-blue-500 hover:underline">
               Forgot password?
             </Link>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white p-2 rounded-md transition-colors ${
                isLoading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          
          <div className="text-center text-sm mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
