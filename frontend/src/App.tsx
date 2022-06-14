/* This example requires Tailwind CSS v2.0+ */
import { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'
import { Tabs } from './components/Tabs'
import { Select } from './components/Select'
import { RefreshIcon } from '@heroicons/react/solid'
import { getRandomArbitrary, removeDiacritics } from './utils'
import { Modal } from './components/Modal'

axios.defaults.baseURL = 'http://localhost:3001'

interface Joke {
    created_at: string
    icon_url: string
    id: string
    value: string
}

interface JokesList {
    total: number
    result: Joke[]
}

const backgroundImages = [
    'images/chuck-1.jpeg',
    'images/chuck-2.png',
    'images/chuck-3.png',
]


export default function App() {

    const [joke, setJoke] = useState<Joke|null>(null)
    const [categories, setCategories] = useState<string[]>([])
    const [openTab, setOpenTab] = useState<number>(1)
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories')
    const [searchText, setSearchText] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasMinLengthError, setHasMinLengthError] = useState<boolean>(false)
    const [modalIsOpen, setModalOpen] = useState<boolean>(false)

    useEffect(() => {
        async function get() {
            try {
                setIsLoading(true)
                const [jokeResult, categoriesResult] = await Promise.all([
                    axios.get<Joke>('/jokes/random'),
                    axios.get<string[]>('/jokes/categories'),
                ])
                if (jokeResult) {
                    const joke = jokeResult.data
                    joke.icon_url = backgroundImages[getRandomArbitrary(0, 2)]
                    setJoke(joke)
                }
                if (categoriesResult) setCategories(categoriesResult.data)
            } catch (error) {
                setModalOpen(true)
            } finally {
                setIsLoading(false)
            }
        }
        get()
    }, [])

    useEffect(() => {
        if(openTab === 2) setHasMinLengthError(true)
    }, [openTab])

    async function getAnotherJoke(evt: SyntheticEvent) {
        evt.preventDefault()
        if (openTab === 2 && hasMinLengthError) return

        let endpoint = '/jokes'
        try {
            setIsLoading(true)
            if (openTab === 1) {
                endpoint += selectedCategory === 'All Categories' ? '/random' : `/random?category=${selectedCategory}`
                const { data } = await axios.get<Joke>(endpoint)
                if (data) {
                    data.icon_url = backgroundImages[getRandomArbitrary(0, 2)]
                    setJoke(data)
                }
            } else {
                endpoint += `/search?query=${removeDiacritics(searchText)}`
                const { data } = await axios.get<JokesList>(endpoint)
                if (data) {
                    const joke = data.result[getRandomArbitrary(0, data.total - 1)]
                    if (joke) {
                        joke.icon_url = backgroundImages[getRandomArbitrary(0, 2)]
                        setJoke(joke)
                    } else {
                        throw new Error()
                    }
                }
            }
        } catch (error) {
            setModalOpen(true)
        } finally {
            setIsLoading(false)
        }
    }

    function handleInputText(event: React.ChangeEvent<HTMLInputElement>){
        const { value } = event.target
        if (value.length < 3) setHasMinLengthError(true)
        else setHasMinLengthError(false)

        setSearchText(value)
    }

    return (
        <div className="bg-white overflow-hidden h-full sm:block">
            <Modal open={modalIsOpen} setOpen={setModalOpen} message='There is no fact with current filters.' title='Error' />
            <div className="max-w-7xl mx-auto">
                <div className="absolute sm:w-full h-full z-10 pb-8 bg-white lg:max-w-2xl lg:w-full">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28" style={{ height: '-webkit-fill-available' }}>
                        <div className="sm:text-center lg:text-left h-80">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-4xl">
                                <p>Chuck Norris</p>
                                <span className="block text-indigo-600 xl:inline">facts</span>
                            </h1>
                            <div className="shadow sm:rounded-md p-4 mt-3 h-full overflow-visible">
                                <Tabs openTab={openTab} setOpenTab={setOpenTab} />
                                <form onSubmit={getAnotherJoke} >
                                    <div className='flex items-center'>
                                        {openTab === 1 ? (
                                            <Select options={categories} selected={selectedCategory} setSelected={setSelectedCategory} />
                                        ) : (
                                            <input
                                                type="text"
                                                name="search"
                                                id="search"
                                                autoComplete="term"
                                                placeholder='Term to search'
                                                onChange={handleInputText}
                                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            />
                                        )}
                                        <button
                                            type="submit"
                                            onClick={getAnotherJoke}
                                            disabled={isLoading}
                                            className="flex justify-center items-center p-1 ml-2 border border-transparent rounded-md h-fit text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                            <span className={`flex items-center ${isLoading ? 'animate-spin' : ''}`}>
                                                <RefreshIcon className="h-5 w-5 group-hover:text-white-400" aria-hidden="true" />
                                            </span>
                                        </button>
                                    </div>
                                    {hasMinLengthError && openTab === 2 && <span className='text-red-900 mt-1'>Minimum 3 characters required.</span>}
                                    
                                </form>
                                <p
                                    className="mt-6 text-base text-gray-500 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
                                    {joke?.value}
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-full">
                <img className="h-56 w-full object-cover md:h-96 lg:w-full lg:h-full"
                    src={joke?.icon_url}
                    alt="" />
            </div>
        </div>
    )
}