import Sidebar from "@/Components/Sidebar";
import TopBar from "@/Components/TopBar";
import 'react-quill/dist/quill.snow.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full grid grid-cols-9">
            <div className="w-full col-span-2 h-full">
                <Sidebar />
            </div>
            <div className="w-full  col-span-7 h-full overflow-y-auto relative">
                <TopBar />
                <div className="w-full">
                    {children}
                </div>
            </div>
        </main>
    );
}
