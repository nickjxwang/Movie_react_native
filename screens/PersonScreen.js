import { Image, Platform } from 'react-native'
import { Dimensions, TouchableOpacity } from 'react-native'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { styles } from '../theme'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useEffect, useState } from 'react'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import {
    fallbackPersonImage,
    fetchPersonDetails,
    fetchPersonMovies,
    image342,
} from '../api/moviedb'

let { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [isFavorite, setIsFavorite] = useState(false)
    const [personMovies, setPersonMovies] = useState([])
    const [person, setPerson] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPersonDetails(item.id)
        getPersonMovies(item.id)
        setLoading(false)
    }, [item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id)
        if (data) setPerson(data)
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id)
        if (data && data.cast) setPersonMovies(data.cast)
    }

    return (
        <ScrollView
            className='flex-1 bg-neutral-900'
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <SafeAreaView
                className={
                    'flex-row justify-between items-center mx-4 z-20 ' +
                    verticalMargin
                }
            >
                <TouchableOpacity
                    style={styles.background}
                    className='p-1 rounded-xl'
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeftIcon
                        size='28'
                        strokeWidth={2.5}
                        color='white'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                    <HeartIcon size='35' color={isFavorite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <View>
                    <View
                        className='flex-row justify-center'
                        style={{
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                        }}
                    >
                        <View className='items-center overflow-hidden border-2 rounded-full h-72 w-72 border-neutral-500'>
                            <Image
                                // source={require('../assets/images/castImage1.png')}
                                source={{
                                    url:
                                        image342(person?.profile_path) ||
                                        fallbackPersonImage,
                                }}
                                style={{
                                    height: height * 0.43,
                                    width: width * 0.74,
                                }}
                            />
                        </View>
                    </View>
                    <View className='mt-6'>
                        <Text className='text-3xl font-bold text-center text-white'>
                            {person?.name}
                        </Text>
                        <Text className='text-base text-center text-neutral-500'>
                            {person?.place_of_birth}
                        </Text>
                    </View>
                    <View className='flex-row items-stretch justify-between p-4 mx-3 mt-6 rounded-full bg-neutral-700'>
                        <View className='items-center px-2 border-r-2 border-r-neutral-400'>
                            <Text className='font-semibold text-white'>
                                Gender
                            </Text>
                            <Text className='text-sm text-neutral-300'>
                                {person?.gender === 1 ? 'Female' : 'Male'}
                            </Text>
                        </View>
                        <View className='items-center px-2 border-r-2 border-r-neutral-400'>
                            <Text className='font-semibold text-white'>
                                Birthday
                            </Text>
                            <Text className='text-sm text-neutral-300'>
                                {person?.birthday}
                            </Text>
                        </View>
                        <View className='items-center px-2 border-r-2 border-r-neutral-400'>
                            <Text className='font-semibold text-white'>
                                Known for
                            </Text>
                            <Text className='text-sm text-neutral-300'>
                                {person?.known_for_department}
                            </Text>
                        </View>
                        <View className='items-center px-2'>
                            <Text className='font-semibold text-white'>
                                Popularity
                            </Text>
                            <Text className='text-sm text-neutral-300'>
                                {person?.popularity?.toFixed(2)} %
                            </Text>
                        </View>
                    </View>
                    <View className='mx-4 my-6 space-y-2'>
                        <Text className='text-lg text-white'>Biography</Text>
                        <Text className='tracking-wide text-neutral-400'>
                            {person?.biography || 'N/A'}
                        </Text>
                    </View>
                    <MovieList
                        title='Movies'
                        hideSeeAll={true}
                        data={personMovies}
                    />
                </View>
            )}
        </ScrollView>
    )
}
export default PersonScreen
