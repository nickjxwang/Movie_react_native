import { Image } from 'react-native'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import {
    fallbackMoviePoster,
    fallbackPersonImage,
    image185,
} from '../api/moviedb'
const Cast = ({ cast, navigation }) => {
    const personName = 'Keanu Reevs'
    const characterName = 'John Wick'
    return (
        <View className='my-6'>
            <Text className='mx-4 mb-5 text-lg text-white'>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {cast &&
                    cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className='items-center mr-4'
                                onPress={() =>
                                    navigation.navigate('Person', person)
                                }
                            >
                                <View className='items-center w-20 h-20 overflow-hidden border rounded-full border-neutral-500'>
                                    <Image
                                        className='w-20 h-24 rounded-2xl'
                                        // source={require('../assets/images/castImage1.png')}
                                        source={{
                                            url:
                                                image185(
                                                    person?.profile_path
                                                ) || fallbackPersonImage,
                                        }}
                                    />
                                </View>

                                <Text className='mt-1 text-xs text-white'>
                                    {person?.character.length > 10
                                        ? person?.character.slice(0, 10) + '...'
                                        : person?.character}
                                </Text>
                                <Text className='mt-1 text-xs text-neutral-400'>
                                    {person?.original_name.length > 10
                                        ? person?.original_name.slice(0, 10) +
                                          '...'
                                        : person?.original_name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        </View>
    )
}
export default Cast
