import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/global/sidebar'
import React from 'react'
import { PrefetchUserAutomations, PrefetchUserProfile } from '@/react-query/prefetch'

type Props = {
    children: React.ReactNode
    params: {
        slug: string
    }
}

const Layout = async ({ children, params }: Props) => {

    // Query Client.. {helps with caching & optimistic UI}  
    const query = new QueryClient()

    // server action to pretect user profile
    await PrefetchUserProfile(query)

    await PrefetchUserAutomations(query)


    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="p-3">
                <Sidebar slug={params.slug} />
                <div
                    className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto"
                >
                    <InfoBar slug={params.slug} />
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Layout;