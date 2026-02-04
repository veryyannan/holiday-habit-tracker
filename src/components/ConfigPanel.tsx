import React, { useState } from 'react';
import { Plus, X, Calendar, Gift, MessageCircle, User, Sparkles, LayoutGrid } from 'lucide-react';
import type { HabitConfig, PresetDetails } from '../types';
import { PRESETS } from '../data/constants';
import { format, differenceInDays } from 'date-fns';

interface ConfigPanelProps {
    config: HabitConfig;
    onChange: (newConfig: HabitConfig) => void;
}

export function ConfigPanel({ config, onChange }: ConfigPanelProps) {
    const [customItem, setCustomItem] = useState('');

    const handlePresetSelect = (preset: PresetDetails) => {
        onChange({
            ...config,
            habits: [...preset.habits],
        });
    };

    const addHabit = () => {
        if (!customItem.trim()) return;
        if (config.habits.length >= 8) return;
        if (config.habits.includes(customItem.trim())) return;

        onChange({
            ...config,
            habits: [...config.habits, customItem.trim()]
        });
        setCustomItem('');
    };

    const removeHabit = (index: number) => {
        const newHabits = [...config.habits];
        newHabits.splice(index, 1);
        onChange({
            ...config,
            habits: newHabits
        });
    };

    // Date constants from PRD
    const setDateRange = (type: 'standard' | 'pre-cny' | 'post-cny') => {
        let start = new Date('2026-01-15');
        let end = new Date('2026-02-16');

        if (type === 'pre-cny') {
            end = new Date('2026-01-28');
        } else if (type === 'post-cny') {
            start = new Date('2026-01-29');
        }

        onChange({
            ...config,
            startDate: start,
            endDate: end
        });
    };

    return (
        <div className="space-y-8">
            {/* 1. 预设方案 */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-indigo-100 rounded-md text-indigo-600">
                        <LayoutGrid className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">快捷预设</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {PRESETS.map(preset => (
                        <button
                            key={preset.id}
                            onClick={() => handlePresetSelect(preset)}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md transition-all text-left group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">{preset.icon}</span>
                            <div className="relative z-10">
                                <div className="font-bold text-slate-800 text-sm">{preset.name}</div>
                                <div className="text-[10px] text-slate-500 font-medium">{preset.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* 2. 基础信息 */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                        <User className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">基础信息</h3>
                </div>

                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">孩子姓名</label>
                        <input
                            type="text"
                            value={config.childName}
                            onChange={e => onChange({ ...config, childName: e.target.value })}
                            placeholder="例如：王小明"
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold text-slate-500 uppercase">日期范围</label>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                                共 {differenceInDays(config.endDate, config.startDate) + 1} 天
                            </span>
                        </div>

                        {/* Date Presets */}
                        <div className="flex gap-2 mb-3">
                            {[
                                { label: '标准寒假', type: 'standard' },
                                { label: '春节前', type: 'pre-cny' },
                                { label: '春节后', type: 'post-cny' }
                            ].map(btn => (
                                <button
                                    key={btn.type}
                                    onClick={() => setDateRange(btn.type as any)}
                                    className="flex-1 py-1.5 text-xs font-medium bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 rounded-md transition-colors shadow-sm text-slate-600"
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="date"
                                    value={format(config.startDate, 'yyyy-MM-dd')}
                                    onChange={e => onChange({ ...config, startDate: new Date(e.target.value) })}
                                    className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                />
                                <Calendar className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                            </div>
                            <span className="text-slate-300">-</span>
                            <div className="relative flex-1">
                                <input
                                    type="date"
                                    value={format(config.endDate, 'yyyy-MM-dd')}
                                    onChange={e => onChange({ ...config, endDate: new Date(e.target.value) })}
                                    className="w-full pl-8 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                />
                                <Calendar className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. 打卡项目 */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-md text-green-600">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">打卡习惯</h3>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{config.habits.length}/8</span>
                </div>

                <div className="space-y-2.5 mb-4">
                    {config.habits.map((habit, index) => (
                        <div key={index} className="flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg group hover:border-blue-300 hover:shadow-sm transition-all animate-fade-in cursor-default">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-xs font-bold text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">{index + 1}</span>
                                <span className="text-sm font-medium text-slate-700">{habit}</span>
                            </div>
                            <button
                                onClick={() => removeHabit(index)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-md transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>

                {config.habits.length < 8 && (
                    <div className="relative group">
                        <input
                            type="text"
                            value={customItem}
                            onChange={e => setCustomItem(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addHabit()}
                            placeholder="输入新习惯，按回车添加..."
                            className="w-full pl-4 pr-12 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-400"
                        />
                        <button
                            onClick={addHabit}
                            disabled={!customItem.trim()}
                            className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-0 disabled:scale-90 transition-all shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </section>

            {/* 4. 激励 */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-pink-100 rounded-md text-pink-600">
                        <Gift className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">激励承诺</h3>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={config.reward}
                            onChange={e => onChange({ ...config, reward: e.target.value })}
                            placeholder="完成挑战的奖励是..."
                            className="w-full px-4 py-2.5 bg-gradient-to-r from-pink-50/50 to-purple-50/50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
                        />
                    </div>

                    <div className="relative">
                        <textarea
                            value={config.note}
                            onChange={e => onChange({ ...config, note: e.target.value })}
                            placeholder="写一句鼓励的话..."
                            rows={2}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition-all"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
