"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useSendFeedbackMutation, SendFeedbackData } from "../hooks/mutations/useSendFeedbackMutation";

interface Option {
    value: string;
    label: string;
}

const TOPICS: Option[] = [
    { value: 'Вопрос по товару', label: 'Вопрос по товару' },
    { value: 'Жалоба', label: 'Жалоба' },
    { value: 'Предложение', label: 'Предложение' },
    { value: 'Другое', label: 'Другое' },
];

const SITUATIONS: Option[] = [
    { value: 'delivery', label: 'Проблема с доставкой' },
    { value: 'quality', label: 'Качество товара' },
    { value: 'payment', label: 'Оплата' },
    { value: 'other', label: 'Иное' },
];

// ToDo: Эээй, аптеки берём только настоящие, а не выдуманные!
const PHARMACIES: Option[] = [
    { value: 'pharm1', label: 'Аптека на ул. Ленинградская, 85' },
    { value: 'pharm2', label: 'Аптека на ул. Мира, 5' },
    { value: 'pharm3', label: 'Аптека на ул. Гагарина, 11' },
];

// Выпадающий список
interface CustomSelectProps {
    options: Option[];
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       options,
                                                       placeholder,
                                                       value,
                                                       onChange,
                                                       error,
                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Закрыть при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || '';

    return (
        <div className="relative" ref={containerRef}>
            <div
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue cursor-pointer flex justify-between items-center ${
                    error ? 'border-destructive' : 'border-gray-300'
                }`}
                style={{ backgroundColor: 'white' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    {value ? selectedLabel : <span className="text-gray-400">{placeholder}</span>}
                </span>

                {/*ToDo: Либо ищи по проекту где уже использовались такие checkMark, либо используй lucide-react. Хватит нагружать проект лишними изображениями. */}
                {/*<Image*/}
                {/*    src={CheckMark1}*/}
                {/*    alt=""*/}
                {/*    width={16}*/}
                {/*    height={16}*/}
                {/*    className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}*/}
                {/*/>*/}
            </div>
            {isOpen && (
                <ul
                    className="absolute z-20 w-full mt-1 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto !bg-white"
                    style={{ backgroundColor: 'white' }}
                >
                    {options.map(opt => (
                        <li
                            key={opt.value}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const FeedbackSection = () => {
    // Состояния для полей формы
    const [topic, setTopic] = useState<string>('');
    const [situation, setSituation] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [bookingNumber, setBookingNumber] = useState<string>('');
    const [bonusCard, setBonusCard] = useState<string>('');
    const [pharmacy, setPharmacy] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    // Состояния для чекбоксов способов связи (закомментированы, но оставлены)
    // const [emailEnabled, setEmailEnabled] = useState<boolean>(false);
    // const [phoneEnabled, setPhoneEnabled] = useState<boolean>(false);

    // Состояния для значений полей способов связи
    const [emailValue, setEmailValue] = useState<string>('');
    const [phoneValue, setPhoneValue] = useState<string>('');

    // Состояния для ошибок и статуса отправки
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const mutation = useSendFeedbackMutation();

    // Автоматическое включение чекбоксов при вводе данных
    //useEffect(() => {
    //    if (emailValue.trim() !== '') setEmailEnabled(true);
    //}, [emailValue]);
    //useEffect(() => {
    //    if (phoneValue.trim() !== '') setPhoneEnabled(true);
    //}, [phoneValue]);

    // Проверка заполнения
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!topic) newErrors.topic = 'Выберите тему обращения';
        if (!situation) newErrors.situation = 'Выберите типовую ситуацию';
        if (!message || message.trim().length < 10) newErrors.message = 'Опишите проблему (минимум 10 символов)';
        if (!pharmacy) newErrors.pharmacy = 'Выберите аптеку';
        if (!firstName || firstName.trim().length < 1) newErrors.firstName = 'Введите имя';
        if (!lastName || lastName.trim().length < 1) newErrors.lastName = 'Введите фамилию';

        // Проверка телефона
        const phoneDigits = phoneValue.replace(/\D/g, '');
        if (phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
            newErrors.phone = 'Введите корректный телефон в формате +7 (___) ___-__-__';
        }

        // Проверка email
        if (!emailValue || !emailValue.includes('@')) {
            newErrors.email = 'Введите корректный email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Обработка отправки
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        // Получаем только цифры
        const rawPhone = phoneValue.replace(/\D/g, '').slice(0, 11); // уже без +

        const data: SendFeedbackData = {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            phone: rawPhone,
            subject: topic,
            message: message.trim(),
            email: emailValue.trim(),
        };

        console.log('Sending data:', data);

        try {
            await mutation.mutateAsync(data);
            setSubmitStatus('success');
            // Очистка формы
            setTopic('');
            setSituation('');
            setMessage('');
            setFile(null);
            setBookingNumber('');
            setBonusCard('');
            setPharmacy('');
            setFirstName('');
            setLastName('');
            setEmailValue('');
            setPhoneValue('');
        } catch (error) {
            setSubmitStatus('error');
            console.error('Submit error:', error);
        }
    };

    // Форматирование телефона при вводе
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (!value.startsWith('7')) value = '7' + value;
        value = value.slice(0, 11);
        let formatted = '+7';
        if (value.length > 1) formatted += ' (' + value.slice(1, 4);
        if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
        if (value.length >= 7) formatted += '-' + value.slice(7, 9);
        if (value.length >= 9) formatted += '-' + value.slice(9, 11);
        setPhoneValue(formatted);
    };

    return (
        <div className='bg-white'>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Тема обращения */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Тема обращения <span className="text-destructive">*</span>
                    </label>
                    <CustomSelect
                        options={TOPICS}
                        placeholder="Выберите тему обращения"
                        value={topic}
                        onChange={setTopic}
                        error={!!errors.topic}
                    />
                    {errors.topic && <p className='text-destructive text-sm mt-1'>{errors.topic}</p>}
                </div>

                {/* Типовая ситуация */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Типовая ситуация <span className="text-destructive">*</span>
                    </label>
                    <CustomSelect
                        options={SITUATIONS}
                        placeholder="Выберите типовую ситуацию"
                        value={situation}
                        onChange={setSituation}
                        error={!!errors.situation}
                    />
                    {errors.situation && <p className='text-destructive text-sm mt-1'>{errors.situation}</p>}
                </div>

                {/* Введите запрос */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Введите запрос <span className="text-destructive">*</span>
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none ${
                            errors.message ? 'border-destructive' : 'border-gray-300'
                        }`}
                        placeholder="Опишите, пожалуйста, причину обращения и подробно расскажите о проблеме. Вы можете также приложить файл со снимком экрана"
                    />
                    {errors.message && <p className='text-destructive text-sm mt-1'>{errors.message}</p>}
                </div>

                {/* Изображение */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Изображение</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
                            style={{ backgroundColor: 'white' }}  // добавляем класс, для того чтобы поле было всегда белым
                        />
                    </div>
                    <div className="md:col-span-1 text-sm text-gray-500 mt-2 py-4 md:mt-0">
                        Вы можете приложить скриншот ошибки, фотографию документа и т.д.
                    </div>
                </div>

                {/* Номер брони */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Номер брони</label>
                        <input
                            type="text"
                            value={bookingNumber}
                            onChange={(e) => setBookingNumber(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue'
                            placeholder=""
                        />
                    </div>
                    <div className="md:col-span-1 text-sm text-gray-500 mt-2 py-4 md:mt-0">
                        Укажите, если обращение связано с использованием заказа
                    </div>
                </div>

                {/* Номер бонусной карты */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Номер бонусной карты</label>
                        <input
                            type="text"
                            value={bonusCard}
                            onChange={(e) => setBonusCard(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue'
                            placeholder=""
                        />
                    </div>
                    <div className="md:col-span-1 text-sm text-gray-500 mt-2 py-4 md:mt-0">
                        <span className="text-destructive">*</span> Заполняется автоматически, при наличии у клиента
                    </div>
                </div>

                {/* Аптека */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Аптека <span className="text-destructive">*</span>
                        </label>
                        <select
                            value={pharmacy}
                            onChange={(e) => setPharmacy(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue ${
                                errors.pharmacy ? 'border-destructive' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Открыть список</option>
                            {PHARMACIES.map(opt => (
                                <option key={opt.value} value={opt.label}>{opt.label}</option>
                            ))}
                        </select>
                        {errors.pharmacy && <p className='text-destructive text-sm mt-1'>{errors.pharmacy}</p>}
                    </div>
                    <div className="md:col-span-1 text-sm text-gray-500 mt-2 py-4 md:mt-0">
                        Выберите аптеку в списке, с которой связано обращение
                    </div>
                </div>

                {/* Имя */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Имя <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue ${
                                    errors.firstName ? 'border-destructive' : 'border-gray-300'
                                }`}
                                placeholder=""
                            />
                            {errors.firstName && <p className='text-destructive text-sm mt-1'>{errors.firstName}</p>}
                        </div>
                        <div className="md:col-span-1"></div>
                    </div>
                </div>

                {/* Фамилия */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Фамилия <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue ${
                                    errors.lastName ? 'border-destructive' : 'border-gray-300'
                                }`}
                                placeholder=""
                            />
                            {errors.lastName && <p className='text-destructive text-sm mt-1'>{errors.lastName}</p>}
                        </div>
                        <div className="md:col-span-1"></div>
                    </div>
                </div>

                {/* email и телефон */}
                <div>
                    {/* Email */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            E-mail <span className="text-destructive">*</span>
                        </label>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='md:col-span-2'>
                                <input
                                    type='email'
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue ${
                                        errors.email ? 'border-destructive' : 'border-gray-300'
                                    }`}
                                    placeholder='example@mail.ru'
                                />
                                {errors.email && <p className='text-destructive text-sm mt-1'>{errors.email}</p>}
                            </div>
                            <div className='md:col-span-1'></div>
                        </div>
                    </div>

                    {/* Телефон */}
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Номер телефона <span className="text-destructive">*</span>
                        </label>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='md:col-span-2'>
                                <input
                                    type='tel'
                                    value={phoneValue}
                                    onChange={handlePhoneChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue ${
                                        errors.phone ? 'border-destructive' : 'border-gray-300'
                                    }`}
                                    placeholder='+7 (___) ___-__-__'
                                />
                                {errors.phone && <p className='text-destructive text-sm mt-1'>{errors.phone}</p>}
                            </div>
                            <div className='md:col-span-1'></div>
                        </div>
                    </div>

                    {/* галочки */}
                    {/*
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>Выберите предпочтительный способ обратной связи (можно несколько):</h3>
                    <div className='mb-4'>
                        <label className='flex items-center space-x-2 mb-2'>
                            <span className='relative inline-flex items-center justify-center w-5 h-5 border border-gray-300 rounded bg-white'>
                                <input
                                    type='checkbox'
                                    checked={emailEnabled}
                                    onChange={(e) => setEmailEnabled(e.target.checked)}
                                    className='absolute opacity-0 w-full h-full cursor-pointer'
                                />
                                {emailEnabled && (
                                    <Image src={CheckMark} alt="" width={16} height={16} />
                                )}
                            </span>
                            <span>E-mail</span>
                        </label>
                    </div>
                    <div className='mb-4'>
                        <label className='flex items-center space-x-2 mb-2'>
                            <span className='relative inline-flex items-center justify-center w-5 h-5 border border-gray-300 rounded bg-white'>
                                <input
                                    type='checkbox'
                                    checked={phoneEnabled}
                                    onChange={(e) => setPhoneEnabled(e.target.checked)}
                                    className='absolute opacity-0 w-full h-full cursor-pointer'
                                />
                                {phoneEnabled && (
                                    <Image src={CheckMark} alt="" width={16} height={16} />
                                )}
                            </span>
                            <span>Номер телефона</span>
                        </label>
                    </div>
                    */}
                </div>

                {/* Статус отправки */}
                {submitStatus === 'success' && (
                    <div className='p-3 bg-green-100 text-green-700 rounded-lg'>
                        Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className='p-3 bg-red-100 text-red-700 rounded-lg'>
                        Произошла ошибка. Пожалуйста, попробуйте позже.
                    </div>
                )}

                {/* Кнопка отправки */}
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className='w-full lg:w-auto px-20 py-6 bg-primary-blue hover:bg-primary-dark text-white-500'
                >
                    {mutation.isPending ? 'Отправка...' : 'Отправить'}
                </Button>
            </form>
        </div>
    );
};

export default FeedbackSection;