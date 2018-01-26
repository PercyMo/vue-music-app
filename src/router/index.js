import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = r => require.ensure([], () => r(require('components/recommend/recommend')), 'Recommend')

const Disc = r => require.ensure([], () => r(require('components/disc/disc')), 'Disc')

const MvDetail = r => require.ensure([], () => r(require('components/mv-detail/mv-detail')), 'MvDetail')

const Singer = r => require.ensure([], () => r(require('components/singer/singer')), 'Singer')

const SingerDetail = r => require.ensure([], () => r(require('components/singer-detail/singer-detail')), 'SingerDetail')

const Rank = r => require.ensure([], () => r(require('components/rank/rank')), 'Rank')

const TopList = r => require.ensure([], () => r(require('components/top-list/top-list')), 'TopList')

const Search = r => require.ensure([], () => r(require('components/search/search')), 'Search')

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend' //首屏重定向
        },
        {
            path: '/recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    component: Disc
                }
            ]
        },
        {
            path: '/mvdetail',
            component: MvDetail
        },
        {
            path: '/singer',
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/rank',
            component: Rank,
            children: [
                {
                    path: ':id',
                    component: TopList
                }
            ]
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
        },
    ]
})