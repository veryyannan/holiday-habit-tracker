import type { PresetDetails } from '../types';

export const PRESETS: PresetDetails[] = [
    {
        id: 'academic',
        name: '学霸养成',
        description: '侧重学习习惯',
        icon: '📚',
        habits: [
            '每日阅读30分钟',
            '完成当日作业',
            '练字10分钟',
            '预习明日课程',
        ],
        color: 'blue'
    },
    {
        id: 'health',
        name: '健康活力',
        description: '侧重身体健康',
        icon: '🏃',
        habits: [
            '运动30分钟',
            '早睡早起',
            '户外活动1小时',
            '眼保健操'
        ],
        color: 'green'
    },
    {
        id: 'balanced',
        name: '全面发展',
        description: '学习生活平衡',
        icon: '🎨',
        habits: [
            '阅读30分钟',
            '运动30分钟',
            '做一件家务',
            '兴趣爱好练习'
        ],
        color: 'purple'
    },
    {
        id: 'custom',
        name: '自定义',
        description: '由你自由发挥',
        icon: '⚡',
        habits: [],
        color: 'gray'
    }
];

export const DEFAULT_HABITS = PRESETS[2].habits;
