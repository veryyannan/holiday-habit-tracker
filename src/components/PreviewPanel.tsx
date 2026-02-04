import React, { useMemo } from 'react';
import type { HabitConfig } from '../types';
import { eachDayOfInterval, format, isSaturday, isSunday } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface PreviewPanelProps {
    config: HabitConfig;
}

export function PreviewPanel({ config }: PreviewPanelProps) {
    const dates = useMemo(() => {
        try {
            if (!config.startDate || !config.endDate) return [];
            if (config.startDate > config.endDate) return [];
            return eachDayOfInterval({
                start: config.startDate,
                end: config.endDate
            });
        } catch (e) {
            return [];
        }
    }, [config.startDate, config.endDate]);

    const title = config.childName ? `${config.childName}的寒假打卡表` : '寒假成长打卡表';

    // 计算列宽逻辑
    const dateColWidth = dates.length > 25 ? 'min-w-[28px]' : 'min-w-[32px]';

    return (
        <div className="w-full bg-white text-slate-900 overflow-hidden relative print:overflow-visible">
            {/* 装饰水印 (仅在打印时微弱显示，预览时显示) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 print:hidden" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 print:hidden" />

            {/* 标题区 */}
            <div className="text-center mb-6 relative z-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 mb-2 font-sans print:text-4xl">
                    <span className="text-blue-700 print:text-black">
                        {title}
                    </span>
                </h1>
                <div className="inline-flex items-center gap-3 text-sm text-slate-500 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 print:border-none print:bg-transparent">
                    <span className="font-medium text-slate-700 print:text-black">
                        📅 {format(config.startDate, 'yyyy年M月d日')} - {format(config.endDate, 'yyyy年M月d日')}
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-blue-600 font-bold print:text-black">共 {dates.length} 天</span>
                </div>
            </div>

            {/* 表格区 */}
            <div className="w-full mb-6 relative z-10 print:mb-4">
                <div className="border-2 border-slate-900 rounded-xl overflow-hidden print:border-2 print:border-black print:rounded-none shadow-sm print:shadow-none">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                {/* 左上角表头 */}
                                <th className="border-r-2 border-b-2 border-slate-900 bg-slate-100 p-3 w-40 text-left print:bg-white print:border-black print:w-32">
                                    <div className="flex flex-col h-full justify-between">
                                        <span className="text-slate-500 text-[10px] self-end print:text-black">📅 日期</span>
                                        <span className="text-slate-900 font-bold text-base self-start print:text-black">📝 习惯</span>
                                    </div>
                                </th>

                                {/* 日期列头 */}
                                {dates.map((date, i) => {
                                    const isWeekend = isSaturday(date) || isSunday(date);
                                    return (
                                        <th key={i} className={`border-l border-b-2 border-slate-900 p-1 text-center bg-white ${isWeekend ? 'print:bg-white' : ''} print:border-black align-bottom pb-2`}>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className={`text-[10px] font-bold ${isWeekend ? 'text-orange-500 print:text-black' : 'text-slate-400 print:text-gray-600'}`}>
                                                    {format(date, 'EE', { locale: zhCN }).replace('周', '')}
                                                </span>
                                                <span className={`text-sm font-bold font-mono ${isWeekend ? 'text-orange-600 print:text-black' : 'text-slate-700'}`}>
                                                    {format(date, 'd')}
                                                </span>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {config.habits.map((habit, rIndex) => (
                                <tr key={rIndex} className="group">
                                    <td className="border-r-2 border-b border-slate-300 bg-white p-3 font-bold text-slate-700 border-slate-900 print:border-black print:py-2 h-12">
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 flex items-center justify-center bg-blue-50 text-blue-600 text-xs rounded-full print:hidden">{rIndex + 1}</span>
                                            <span className="truncate">{habit}</span>
                                        </div>
                                    </td>
                                    {dates.map((date, cIndex) => {
                                        return (
                                            <td key={cIndex} className="border-l border-b border-slate-300 relative text-center border-slate-900 print:border-black h-12">
                                                {/* 确保打印时有固定高度，即使内容为空 */}
                                                <div className="w-full h-full min-h-[32px] hover:bg-blue-50 transition-colors cursor-pointer print:hidden" />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}

                            {/* 填充行 */}
                            {Array.from({ length: Math.max(0, 8 - config.habits.length) }).map((_, i) => (
                                <tr key={`empty-${i}`}>
                                    <td className="border-r-2 border-b border-slate-300 bg-slate-50/50 p-3 border-slate-900 print:border-black print:bg-white print:py-2 h-12">
                                        <span className="text-slate-300 text-xs italic border-b border-dashed border-slate-300 w-full block h-4"></span>
                                    </td>
                                    {dates.map((_, cIndex) => (
                                        <td key={cIndex} className="border-l border-b border-slate-300 border-slate-900 print:border-black h-12"></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 底部激励区 */}
            <div className="flex gap-6 mt-6 print:mt-4">
                {/* 奖励 */}
                <div className="flex-1 border-2 border-slate-900 rounded-xl p-4 relative bg-blue-50/30 print:border-black print:bg-white print:rounded-lg">
                    <div className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1 print:bg-white">
                        <span className="text-lg">🎁</span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider print:text-black">HOPE 奖励承诺</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800 mt-2 ml-2 font-handwriting print:text-black">
                        {config.reward || '__________________________'}
                    </p>
                </div>

                {/* 寄语 */}
                <div className="flex-[1.5] border-2 border-slate-900 rounded-xl p-4 relative bg-pink-50/30 print:border-black print:bg-white print:rounded-lg">
                    <div className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1 print:bg-white">
                        <span className="text-lg">💬</span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider print:text-black">LOVE 家长寄语</span>
                    </div>
                    <p className="text-base text-slate-600 italic mt-2 ml-2 print:text-black">
                        {config.note || '__________________________________________________'}
                    </p>
                </div>

                {/* 签名 */}
                <div className="w-40 flex flex-col justify-end items-center pb-2">
                    <div className="w-full border-b-2 border-slate-900 mb-2 print:border-black"></div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest print:text-black">家长签名 SIGNATURE</span>
                </div>
            </div>

            <div className="text-center mt-6 text-[10px] text-slate-300 flex items-center justify-center gap-2 print:text-gray-400 print:mt-4">
                <span>✨ 每一个小习惯，都是成长的勋章</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>Created with 寒假打卡助手</span>
            </div>
        </div>
    );
}

