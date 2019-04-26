import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('@/views/Singleship/Index.vue')
            // children: [
            //     { path: '/source', component: () => import('@/views/Singleship/SourceAddressFormView.vue') },
            //     { path: '/destination', component: () => import('@/views/Singleship/DestinationAddressFormView.vue') },
            //     { path: '/parcel', component: () => import('@/views/Singleship/ParcelFormView.vue') },
            //     { path: '/rates', component: () => import('@/views/Singleship/RateReviewView.vue') },
            //     { path: '/download', component: () => import('@/views/Singleship/DownloadLabelView.vue') }
            // ]
        },
        {
            path: '/multiship',
            name: 'multiship',
            component: () => import('@/views/Multiship/Index.vue')
        }
    ]
})
