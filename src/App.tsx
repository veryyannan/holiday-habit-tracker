import { useState } from 'react'
import { ConfigPanel } from './components/ConfigPanel'
import { PreviewPanel } from './components/PreviewPanel'
import type { HabitConfig } from '../types';
import { DEFAULT_HABITS } from './data/constants'

function App() {
  const [config, setConfig] = useState<HabitConfig>({
    childName: '',
    startDate: new Date('2026-01-15'),
    endDate: new Date('2026-02-16'),
    habits: DEFAULT_HABITS,
    reward: '',
    note: '',
    theme: 'black-white'
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-900 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto space-y-4 print:max-w-none print:space-y-0">
        <header className="text-center py-6 print:hidden">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            寒假习惯打卡表生成工具
          </h1>
          <p className="text-gray-500 mt-2">
            60秒定制专属打卡表，助力孩子假期成长
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
          {/* 左侧配置区 - 打印时隐藏 */}
          <div className="lg:col-span-4 print:hidden">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4 overflow-y-auto max-h-[calc(100vh-2rem)] custom-scrollbar">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                🛠️ 定制打卡表
              </h2>
              <ConfigPanel config={config} onChange={setConfig} />
            </section>
          </div>

          {/* 右侧预览区 - 打印时全屏 */}
          <div className="lg:col-span-8 print:w-full">
            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[600px] print:shadow-none print:border-none print:p-0">
              <div className="flex justify-between items-center mb-4 print:hidden">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  📄 预览效果
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 shadow-lg transition-all active:scale-95"
                  >
                    🖨️ 立即打印
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex items-center justify-center text-gray-400 bg-gray-50 print:border-none print:bg-white print:block print:p-0">
                <PreviewPanel config={config} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
