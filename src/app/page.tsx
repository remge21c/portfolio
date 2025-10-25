"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [staticImageLoaded, setStaticImageLoaded] = useState<boolean>(false);

  // 프로필 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 정적 이미지 경로 (public 폴더에 profile.jpg 파일을 넣으면 자동으로 표시됩니다)
  const staticProfileImage = "/profile.jpg";

  // 컴포넌트 마운트 시 정적 이미지 존재 여부 확인
  useEffect(() => {
    const checkStaticImage = async () => {
      try {
        const response = await fetch(staticProfileImage);
        if (response.ok) {
          setStaticImageLoaded(true);
        }
      } catch (error) {
        setStaticImageLoaded(false);
      }
    };
    checkStaticImage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Modern Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">LP</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#profile" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Profile</a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">About</a>
              <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Skills</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Profile Section */}
      <section id="profile" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Profile Image with Upload */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-80 h-80 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 dark:border-slate-600/50 backdrop-blur-sm overflow-hidden">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="프로필 사진"
                      width={288}
                      height={288}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden">
                      {staticImageLoaded ? (
        <Image
                          src={staticProfileImage}
                          alt="프로필 사진"
                          width={288}
                          height={288}
                          className="w-full h-full object-cover rounded-full"
                          onLoad={() => setStaticImageLoaded(true)}
                          onError={() => setStaticImageLoaded(false)}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-8xl">👨‍💻</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* 사진 업로드 버튼 */}
                <div className="absolute bottom-4 right-4 group">
                  <label className="cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                      <span className="text-white text-xl">📷</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {/* 툴팁 */}
                  <div className="absolute bottom-16 right-0 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    사진 업로드
                  </div>
                </div>
              </div>
            </div>

            {/* 사진 업로드 안내 */}
            <div className="lg:hidden mb-8">
              <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">사진 업로드 방법</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      프로필 사진 영역의 📷 버튼을 클릭하여 사진을 업로드하거나, 
                      <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">public/profile.jpg</code> 파일을 추가하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Info Cards */}
            <div className="space-y-8">
              {/* I AM Card */}
              <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  _I AM
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <p className="text-xl text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">이름:</span> 이프로
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"></div>
                    <p className="text-xl text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">포지션:</span> PM 서비스 기획 / FE Developer(jr)
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  _Contact
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">📧</span>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300">leepro@naver.com</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300">+082 - 1234-5678</p>
                  </div>
                </div>
              </div>

              {/* Channel Card */}
              <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  _Channel
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <div className="flex-1 h-12 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-500 flex items-center justify-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">SNS 링크</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">🐙</span>
                    </div>
                    <div className="flex-1 h-12 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-500 flex items-center justify-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">GitHub 링크</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Introduce
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-3xl p-12 shadow-2xl border border-white/20 dark:border-slate-700/50 hover:shadow-3xl transition-all duration-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl">💡</span>
              </div>
              <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
                안녕하세요! <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CAD 서드파트 개발자 이프로</span>입니다. 
                사용자 중심의 서비스 기획과 프론트엔드 개발에 열정을 가지고 있으며, 
                창의적이고 효율적인 솔루션을 제공하는 것을 목표로 합니다. 
                지속적인 학습과 성장을 통해 더 나은 개발자로 발전해나가고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Tech Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'JavaScript', icon: '🟨', gradient: 'from-yellow-400 to-orange-500' },
              { name: 'TypeScript', icon: '🔷', gradient: 'from-blue-500 to-blue-700' },
              { name: 'React', icon: '⚛️', gradient: 'from-cyan-400 to-blue-600' },
              { name: 'Tailwind', icon: '🎨', gradient: 'from-teal-400 to-cyan-600' },
              { name: 'Premiere Pro', icon: '🎬', gradient: 'from-purple-500 to-pink-600' }
            ].map((skill, index) => (
              <div 
                key={skill.name}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="backdrop-blur-md bg-white/70 dark:bg-slate-800/70 rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${skill.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{skill.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {skill.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-t border-white/20 dark:border-slate-700/50 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LP</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lee Pro
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              © 2024 Portfolio. Made with ❤️ using Next.js & Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full animate-pulse delay-300"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
