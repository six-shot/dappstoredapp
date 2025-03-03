'use client'
import { CategorySelectFilter } from '@/components/atoms/CategorySelectFilter';
import { ChainSelectFilter } from '@/components/atoms/ChainSelectFilter';
import { StatusSelectFilter } from '@/components/atoms/StatusFilter';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

interface Chain {
    chainId: number;
    name: string;
}

interface Category {
    categoryId: number;
    name: string;
}

const page = () => {

    const [dappName, setDappName] = useState<string>('');
    const [logoUrl, setLogoUrl] = useState<string>('');
    const [tagline, setTagline] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [githubUrl, setGithubUrl] = useState<string>('');
    const [websiteUrl, setWebsiteUrl] = useState<string>('');
    const [twitterUrl, setTwitterUrl] = useState<string>('');
    const [discordUrl, setDiscordUrl] = useState<string>('');
    const [selectedChains, setSelectedChains] = useState<Chain[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]); // Change to array

    const handleCheckboxChange = (chainName: string, chainId: number) => {
        const chain = { chainId, name: chainName };
        if (selectedChains.some((selectedChain) => selectedChain.chainId === chainId)) {
            setSelectedChains(selectedChains.filter((selectedChain) => selectedChain.chainId !== chainId));
        } else {
            setSelectedChains([...selectedChains, chain]);
        }
    };

    const handleCategoryCheckboxChange = (categoryName: string, categoryId: any) => {
        const category = { categoryId, name: categoryName };
        if (selectedCategories.some((selectedCategory) => selectedCategory.categoryId === categoryId)) {
            setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory.categoryId !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleStatusCheckboxChange = (status: string) => {
        setSelectedStatus((prevSelectedStatus) => {
            if (prevSelectedStatus.includes(status)) {
                // Remove status if already selected
                return prevSelectedStatus.filter((s) => s !== status);
            } else {
                // Add status if not already selected
                return [...prevSelectedStatus, status];
            }
        });
    };

    const [sendingData, setSendingData] = useState<boolean>(false);
    const handleSendData = async () => {
        if(sendingData) return;
        const requestData = {
            name: dappName,
            description: description,
            tagLine: tagline,
            logoUrl: logoUrl,
            websiteUrl: websiteUrl,
            category: selectedCategories.map(cat => cat.name),
            chains: selectedChains.map(chain => chain.name),
            status: selectedStatus, // Pass the array of selected statuses
            socialLinks: {
                twitter: twitterUrl,
                github: githubUrl,
                discord: discordUrl,
            },
            approvalStatus: 'pending',
        };

        try {
            setSendingData(true);
            const res = await fetch('https://api.dappbook.store/api/dapps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })

            if (res.ok) {
                const data = await res.json();
                console.log('Dapp added successfully:', data);
                toast.success('Dapp added successfully');
            } else {
                console.error('Error:', res.statusText);
                toast.error('Failed to add dapp');
            }
        } catch (error) {
            console.error('Failed to fetch chains:', error);
            toast.error('Failed to add dapp');
        } finally {
            setSendingData(false);
        }
    }

    return (
        <div className='bg-[#161616] h-full p-4 md:p-6'>
            <Toaster/>
            <div className="flex gap-[30px] max-w-[1170px] mx-auto">
                <aside className="flex flex-col">
                    <StatusSelectFilter selectedStatus={selectedStatus} handleStatusCheckboxChange={handleStatusCheckboxChange} />
                    <ChainSelectFilter
                        selectedChains={selectedChains}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <CategorySelectFilter
                        selectedCategories={selectedCategories}
                        handleCategoryCheckboxChange={handleCategoryCheckboxChange} />
                </aside>
                <aside className="flex flex-col gap-[30px] w-full">
                    <div className="flex w-full gap-4">
                        <div className="flex flex-col gap-3 flex-1">
                            <span className="">Name</span>
                            <input value={dappName} onChange={(e) => setDappName(e.target.value)} type="text" placeholder='Enter dapp name' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <span className="">Logo URL</span>
                            <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} type="text" placeholder='Enter dapp logo URL' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="">Tagline</span>
                        <input value={tagline} onChange={(e) => setTagline(e.target.value)} type="text" placeholder='Enter dapp tagline' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="">Description</span>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={33} placeholder='Enter dapp description' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none"></textarea>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="flex flex-col gap-3 flex-1">
                            <span className="">Github URL</span>
                            <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} type="text" placeholder='Enter Github URL' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <span className="">Website URL</span>
                            <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} type="text" placeholder='Enter dapp website URL' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="flex flex-col gap-3 flex-1">
                            <span className="">Twitter URL</span>
                            <input value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} type="text" placeholder='Enter Twitter URL' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <span className="">Discord URL</span>
                            <input value={discordUrl} onChange={(e) => setDiscordUrl(e.target.value)} type="text" placeholder='Enter Discord URL' className="bg-[#2d2d2d] p-2 px-4 rounded-md focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex w-full justify-center items-center gap-4">
                        <button
                            onClick={handleSendData}
                            disabled={sendingData}
                            className='rounded-md border border-white cursor-pointer px-[48px] py-[12px]'>List Dapp</button>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default page;
