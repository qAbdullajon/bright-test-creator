import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, LogOut, LayoutDashboard, User, Users, Archive, Loader2, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { $api, setUnauthorizedHandler } from "@/http/api";
import { toast } from "sonner";
import { DialogModal } from "@/components/Dialog";

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [openLogout, setOpenLogout] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const sidebarItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/teacher/dashboard" },
        { icon: User, label: "Profile", path: "/teacher/profile" },
        { icon: Users, label: "Students", path: "/teacher/students" },
        { icon: Archive, label: "Archives", path: "/teacher/archives" },
    ];

    const logOut = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    useEffect(() => {
        setUnauthorizedHandler(() => {
            navigate("/teacher/login");
        });

        const getIsAuth = async () => {
            try {
                const res = await $api.get("/auth/me");
                setLoading(false);
            } catch (err: any) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem("accessToken");
                    navigate("/teacher/login");
                } else {
                    toast.error("Xatolik", { description: "Noma'lum xatolik yuz berdi" });
                }
                setLoading(false);
            }
        };

        getIsAuth();
    }, []);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
                <p className="mt-4 text-lg font-medium text-gray-700">Yuklanmoqda...</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            {/* Mobile top bar */}
            <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
                <Link to="/" className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">Mini-Test</span>
                </Link>
                <Button variant="ghost" onClick={() => setMobileSidebarOpen(true)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card flex flex-col transform lg:translate-x-0 transition-transform duration-300",
                    mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:relative lg:translate-x-0"
                )}
            >
                <div className="p-6 border-b hidden lg:flex">
                    <Link to="/" className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">Mini-Test</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => setMobileSidebarOpen(false)} // close mobile menu
                            >
                                <Icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <Button onClick={() => setOpenLogout(true)} variant="ghost" className="w-full justify-start" asChild>
                        <div>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </div>
                    </Button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            <DialogModal open={openLogout} onClose={() => setOpenLogout(false)} onSubmit={logOut} />

            <main className="flex-1 p-6 overflow-auto lg:ml-64">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
