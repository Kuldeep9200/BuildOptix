import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Lock, ShieldAlert, FileText } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            const response = {
                token: "mock_jwt_token_xyz123",
                userProfile: {
                    user_Id: 101,
                    office_Type: 1,
                    project_id: 12,
                    email: email || "kuldeep@enterprise.com",
                    role: "Administrator"
                }
            };

            localStorage.setItem('token', response.token);
            localStorage.setItem('userProfile', JSON.stringify(response.userProfile));

            window.location.href = '/dashboard';
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060b13] flex text-slate-300 font-sans select-none">

            <div className="hidden lg:flex lg:w-1/2 bg-[#03070c] relative flex-col justify-between p-16 overflow-hidden border-r border-slate-900/60">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                {/* Top Section: Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="h-9 w-9 bg-[#0fa5e9]/10 rounded-lg flex items-center justify-center border border-[#0fa5e9]/30">
                        <span className="text-[#0fa5e9] font-bold text-lg">K</span>
                    </div>
                    <span className="text-xl font-bold tracking-wider text-white">KAFM
                        <span className="text-[#0fa5e9]"></span></span>
                </div>

                {/* Middle Section: Hero Text & Badges */}
                <div className="space-y-8 relative z-10 my-auto">
                    <div className="space-y-3">
                        <p className="text-[11px] font-bold tracking-widest text-[#0fa5e9] uppercase">Unified Facility Platform</p>
                        <h1 className="text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                            One platform.<br />Configure it.<br />Run it.
                        </h1>
                    </div>

                    <p className="text-slate-400 text-[14px] max-w-md leading-relaxed">
                        Administer tenants, sites and access — then operate every building from the same console. Multi-tenant, scoped to the site in front of you.
                    </p>

                    {/* Security Tags */}
                    <div className="space-y-2.5 pt-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0b1320] border border-slate-800/80 rounded-lg text-xs font-medium text-slate-400">
                            <ShieldCheck className="h-3.5 w-3.5 text-[#0fa5e9]" /> MFA enforced
                        </div>
                        <br />
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0b1320] border border-slate-800/80 rounded-lg text-xs font-medium text-slate-400">
                            <Lock className="h-3.5 w-3.5 text-[#0fa5e9]" /> Encrypted in transit
                        </div>
                        <br />
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0b1320] border border-slate-800/80 rounded-lg text-xs font-medium text-slate-400">
                            <FileText className="h-3.5 w-3.5 text-[#0fa5e9]" /> Full audit trail
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Counters */}
                <div className="grid grid-cols-3 gap-3 max-w-xs relative z-10 border-t border-slate-900/60 pt-8">
    <div>
        {/* 🌟 ml-[19px] और font-bold (700) ऐड कर दिया है सर */}
        <p className="text-4xl font-bold text-white tracking-tight ml-[19px]">4</p>
        <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1 ml-[19px]">Tenants</p>
    </div>
    <div>
        <p className="text-4xl font-bold text-white tracking-tight ml-[19px]">8</p>
        <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1 ml-[19px]">Modules</p>
    </div>
    <div>
        <p className="text-4xl font-bold text-white tracking-tight ml-[19px]">2</p>
        <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1 ml-[19px]">Workspaces</p>
    </div>
</div>
            </div>

            {/* ─── RIGHT SIDE: LOGIN FORM ─── */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-16 lg:px-24 bg-[#060b13]">
                <div className="w-full max-w-[420px] space-y-8">

                    {/* Header Text */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Sign in to your account</h2>
                        <p className="text-sm text-slate-400">Use your registered work credentials.</p>
                    </div>

                    {/* Main Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full bg-[#0a101d] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0fa5e9] focus:ring-1 focus:ring-[#0fa5e9] transition-all"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0a101d] border border-slate-800 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0fa5e9] focus:ring-1 focus:ring-[#0fa5e9] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-300 select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="accent-[#10b981] h-4 w-4 rounded bg-slate-900 border-slate-800 text-[#10b981] focus:ring-0 focus:ring-offset-0"
                                />
                                <span>Keep me signed in</span>
                            </label>
                            <a href="#forgot" className="text-sm text-[#0fa5e9] hover:underline font-medium">Forgot password?</a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-[#060b13] font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#14b8a6]/10 active:scale-[0.99] flex items-center justify-center text-sm"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-900"></div>
                        <span className="flex-shrink mx-4 text-xs text-slate-600 font-mono">or</span>
                        <div className="flex-grow border-t border-slate-900"></div>
                    </div>

                    {/* SSO Button */}
                    <button
                        type="button"
                        className="w-full bg-[#0a101d] hover:bg-[#0f172a] text-slate-200 border border-slate-800 font-semibold py-3.5 px-4 rounded-xl transition-all text-sm active:scale-[0.99]"
                    >
                        Sign in with SSO
                    </button>

                    {/* Bottom Microcopy */}
                    <p className="text-[11px] text-slate-600 text-center tracking-wide">
                        Protected by 2-factor auth • every sign-in is audit-logged
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;