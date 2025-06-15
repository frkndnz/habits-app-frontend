import { useState, useEffect } from 'react';
import { Edit3, Save, X, User, Mail, Target, Calendar, TrendingUp, Award } from 'lucide-react';
import { useGetSummaryStatsQuery } from '../../features/stats/statsApi';
import { useGetUserProfileQuery } from '../../features/users/usersApi';

import { parseFieldErrors } from '../../utils/parseFieldErrors';
import { useUpdateUserProfileMutation } from '../../features/users/usersApi';


const ProfileInfoCard = () => {


    const { data: summaryData } = useGetSummaryStatsQuery();
    const { data: userData } = useGetUserProfileQuery();
    const [updateUserProfile] = useUpdateUserProfileMutation();

    const profileData = userData?.value;

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    

    useEffect(() => {
        if (profileData) {
            setEditData(profileData);
            console.log(profileData);
        }
    }, [profileData]);

    const handleEdit = () => {
        setEditData(profileData || {});
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(editData).unwrap();
            setIsEditing(false);
            setFieldErrors({});
        } catch (error) {
            if (error?.data?.errorMessages) {

                setFieldErrors(parseFieldErrors(error.data.errorMessages));
            }
            else {
                console.log(error);
            }
        }
    };

    const handleCancel = () => {
        setEditData(profileData || {});
        setIsEditing(false);
        setFieldErrors({});
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
        setFieldErrors({});
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Belirtilmemiş';
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long'
        });
    };

    // Loading state
    if (!profileData) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-pulse">
                    <div className="h-24 bg-gray-200"></div>
                    <div className="p-8">
                        <div className="flex justify-center -mt-12 mb-6">
                            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-16 bg-gray-200 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Colorful header */}
                <div className="relative h-24 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                    <div className="absolute top-4 right-4">
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-200 text-sm"
                            >
                                <Edit3 className="w-3 h-3" />
                                Düzenle
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full hover:bg-emerald-600/90 transition-all duration-200 text-sm"
                                >
                                    <Save className="w-3 h-3" />
                                    Kaydet
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600/90 transition-all duration-200 text-sm"
                                >
                                    <X className="w-3 h-3" />
                                    İptal
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile content */}
                <div className="relative px-8 pb-8">
                    {/* Profile picture */}
                    <div className="flex justify-center -mt-12 mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-1 shadow-xl">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <User className="w-10 h-10 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Name and username */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {profileData?.firstName} {profileData?.lastName}
                        </h1>
                        <p className="text-gray-500 text-sm">@{profileData?.userName}</p>
                    </div>

                    {/* Basic info */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Ad</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData?.firstName || ''}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="text-gray-900 font-medium bg-transparent border-none outline-none focus:ring-0 p-0"
                                            required
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{profileData?.firstName}</p>
                                    )}
                                    {fieldErrors["firstName"] && (
                                        <p className="mt-1 text-sm text-red-500">{fieldErrors["firstName"]}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-cyan-600" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Soyad</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData?.lastName || ''}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="text-gray-900 font-medium bg-transparent border-none outline-none focus:ring-0 p-0"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{profileData?.lastName}</p>
                                    )}
                                    {fieldErrors["lastName"] && (
                                        <p className="mt-1 text-sm text-red-500">{fieldErrors["lastName"]}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">E-posta</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editData?.email || ''}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="text-gray-900 font-medium bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium break-all">{profileData?.email}</p>
                                    )}
                                    {fieldErrors["email"] && (
                                        <p className="mt-1 text-sm text-red-500">{fieldErrors["email"]}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Katılım</label>
                                    <p className="text-gray-900 font-medium">{formatDate(profileData?.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Habit stats */}
                    <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Habit İstatistikleri</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-xl font-bold text-gray-900">{summaryData?.value?.activeHabits || 0}</div>
                                <div className="text-xs text-gray-600">Aktif Habit</div>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-xl font-bold text-gray-900">{summaryData?.value?.longestStreak || 0}</div>
                                <div className="text-xs text-gray-600">Best Streak</div>
                                {summaryData?.value?.longestStreakHabitName && (
                                    <div className="text-xs text-gray-600">{summaryData.value.longestStreakHabitName}</div>
                                )}
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-xl font-bold text-gray-900">{summaryData?.value?.totalHabits || 0}</div>
                                <div className="text-xs text-gray-600">Toplam Habit</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoCard;