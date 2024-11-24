document.addEventListener('DOMContentLoaded', function() {
	// Получаем элементы для модальных окон
	const contactModal = document.getElementById('contact-modal');
	const hoursModal = document.getElementById('hours-modal');
	const aboutModal = document.getElementById('contact-about');
	const contactsLink = document.getElementById('contacts-link');
	const workingHoursLink = document.getElementById('working-hours-link');
	const aboutLink = document.getElementById('open-modal');
	const closeButtons = document.querySelectorAll('.close-button');

	// Проверка на существование элементов перед использованием
	if (!contactModal || !hoursModal || !aboutModal || !contactsLink || !workingHoursLink || !aboutLink) return;

	// Функции для открытия и закрытия модальных окон
	const openModal = (modal) => {
		modal.style.display = 'block';
	};
	const closeModal = (modal) => {
		modal.style.display = 'none';
	};

	// Привязка событий
	contactsLink.onclick = (event) => {
		event.preventDefault();
		openModal(contactModal);
	};
	workingHoursLink.onclick = (event) => {
		event.preventDefault();
		openModal(hoursModal);
	};
	aboutLink.onclick = (event) => {
		event.preventDefault();
		openModal(aboutModal);
	};

	closeButtons.forEach(button => {
		button.onclick = (event) => {
			closeModal(event.target.closest('.modal'));
		};
	});

	window.onclick = (event) => {
		if (event.target === contactModal) closeModal(contactModal);
		if (event.target === hoursModal) closeModal(hoursModal);
		if (event.target === aboutModal) closeModal(aboutModal);
	};

	// Бургер-меню
	const burger = document.getElementById('burger');
	const menuList = document.getElementById('menu-list');
	if (burger && menuList) {
		burger.onclick = () => {
			menuList.classList.toggle('active');
			burger.classList.toggle('active');
		};
	}

	// Прокрутка навигационного меню
	const nav = document.querySelector('.menu');
	if (nav) {
		window.addEventListener('scroll', () => {
			nav.classList.toggle('scrolled', window.scrollY > 50);
		});
	}

	// Плавная прокрутка
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(event) {
			event.preventDefault();
			const targetId = this.getAttribute('href').substring(1);
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop,
					behavior: 'smooth'
				});
			}
		});
	});

	// Прокрутка изображений
	const scrollContainer = document.querySelector('.scroll-content');
	const scrollLeftButton = document.querySelector('.scroll-left');
	const scrollRightButton = document.querySelector('.scroll-right');

	if (scrollContainer && scrollLeftButton && scrollRightButton) {
		const scrollLeft = () => {
			scrollContainer.scrollBy({
				left: -300,
				behavior: 'smooth'
			});
		};

		const scrollRight = () => {
			scrollContainer.scrollBy({
				left: 300,
				behavior: 'smooth'
			});
		};

		scrollLeftButton.onclick = scrollLeft;
		scrollRightButton.onclick = scrollRight;
	}

	// Обработчик переключения языка
	let lang = localStorage.getItem('lang') || 'lt'; // Получаем язык из localStorage или по умолчанию 'lt'

	// Перевод текста
	function changeLanguage(lang) {
		const elements = document.querySelectorAll('[data-i18n]');
		elements.forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (translations[lang] && translations[lang][key]) {
				el.innerText = translations[lang][key];
			}
		});
	}

	// Загрузка перевода при загрузке страницы
	changeLanguage(lang);

	// Переключатель языка
	const languageSelector = document.getElementById('language');
	if (languageSelector) {
		languageSelector.value = lang;
		languageSelector.addEventListener('change', (e) => {
			const lang = e.target.value;
			localStorage.setItem('lang', lang);
			changeLanguage(lang);
		});
	}

	// Модальное окно для резервирования
	const myModal = document.getElementById('myModal');
	const closeModalButton = myModal ? myModal.querySelector('.close') : null;
	const reserveButton = document.querySelector('.reserve-table');

	if (myModal && closeModalButton && reserveButton) {
		// Открытие модального окна при нажатии на "Резервировать стейку"
		reserveButton.addEventListener('click', (event) => {
			event.preventDefault(); // Останавливаем переход по ссылке
			myModal.style.display = 'block';
		});

		// Закрытие модального окна
		closeModalButton.addEventListener('click', () => {
			myModal.style.display = 'none';
		});

		// Закрытие модального окна при клике вне его
		window.addEventListener('click', (event) => {
			if (event.target === myModal) {
				myModal.style.display = 'none';
			}
		});
	}

	// Обработка отправки формы
	document.getElementById('orderForm')?.addEventListener('submit', function(event) {
		event.preventDefault();

		const formData = new FormData(this);

		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				document.getElementById('responseMessage').textContent = 'Форма успешно отправлена!';
				this.reset(); // очищаем форму

				const successMessage = document.getElementById('successMessage');
				if (successMessage) {
					successMessage.classList.add('show');
					setTimeout(() => {
						successMessage.classList.remove('show');
						myModal.style.display = 'none'; // закрытие модального окна
					}, 2000);
				}
			} else {
				document.getElementById('responseMessage').textContent = 'Ошибка отправки формы.';
			}
		})
		.catch(error => {
			document.getElementById('responseMessage').textContent = 'Произошла ошибка: ' + error.message;
		});
	});

	// Отключаем изменение размера для текстовых полей
	const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
	inputs.forEach(input => {
		input.style.resize = 'none';
	});
});

// const translations = {
// 	lt: {
// 		"contact-information": "Kontaktinė informacija",
// 		"Address-Vilnius": "Adresas Vilnius:",
// 		"working-hours": "Darbo valandos:",
// 		"day": "Diena:",
// 		"monday": "Pirmadienis:",
// 		"closed": "Uždaryta",
// 		"tuesday": "Antradienis",
// 		"wednesday": "Trečiadienis",
// 		"thursday": "Ketvirtadienis",
// 		"friday": "Penktadienis",
// 		"saturday": "Šeštadienis",
// 		"sunday": "Sekmadienis",
// 		"menu-tr": "Meniu",
// 		"reserve-table": "Rezervuoti staliuką",
// 		"contacts": "Kontaktai",
// 		"contact-us": "Palikite savo duomenis, mes jums paskambinsime",
// 		"name": "Vardas:",
// 		"phone": "Telefonas:",
// 		"email": "El. paštas:",
// 		"your-coment": "Komentaras:",
// 		"Newsletter": "Sutinku su naujienlaiškio sąlygomis",
// 		"submit": "Pateikti",
// 		"submitDone": "Pateikta!",
// 		 "about-title": "Tailandiečių restoranas Vilniuje",
// 		"about-description": "Įkvėpti neapsakomai turtingos Tailando kultūros ir unikalios virtuvės, mes, restorano komanda, siekėme sukurti vietą, kurioje kiekvienas svečias galėtų mėgautis ne tik išskirtiniais ir gardžiais patiekalais, bet ir pasinerti į autentišką tailandietiško svetingumo atmosferą. Mūsų kelionės po Tailandą suteikė mums nepamirštamų įspūdžių, įkvėpė atrasti ne tik gatvės maisto aromatus, bet ir gilų susidomėjimą tradiciniais kulinariniais malonumais. Šie įspūdžiai tapo mūsų restorano siela, kurią norime pasidalinti su jumis – tikrais ir autentiškais skoniais, senais šeimos receptais, kad kiekvienas apsilankymas mūsų restorane taptų nuostabiu pasinerimu į Tailando virtuvės ir kultūros pasaulį, kupiną šilumos ir svetingumo.",
// 		 "about-menu-text": "„Thai House“ meniu siūlo išskirtinį patiekalų pasirinkimą, atspindintį unikalų saldaus, rūgštaus, aštraus ir sūraus skonių derinį, būdingą tajų virtuvei. Čia galite mėgautis tradiciniu Tom Yum sriuba su jūrų gėrybėmis ir skaniu Pad Thai – keptais makaronais su daržovėmis ir riešutais. Taip pat siūlome daugybę vegetariškų patiekalų, pagamintų iš šviežių vietinių ingredientų, kurie suteikia patiekalams gilų skonį ir malonų aromatą. Patiekalų aštrumą galime pritaikyti pagal kiekvieno kliento pageidavimus. Desertams siūlome lipnų ryžių pudingą su mango ir kokosų pienu, taip pat egzotiškus gėrimus, tokius kaip tajų arbata su pienu ir gaivų kokosų vandenį.",
// 		"main-menu": "Pagrindinis meniu",
// 		"drinks": "Gėrimų meniu",
// 		"social-media": "Sekite mus socialinėje žiniasklaidoje, kad gautumėte naujienų!",
// 		"about-us": "Apie mus",
// 		"vision": "Tailandietiško restorano „Thai House“ savininkas svajoja sukurti unikalią erdvę, kurioje svečiai galėtų mėgautis autentiška Tailando atmosfera. Siekiama pasiūlyti autentiškus tailandietiškus patiekalus, pagamintus iš šviežių vietinių ingredientų, kad kiekvienam svečiui būtų suteikta autentiška tajų virtuvės patirtis. Jo idėjos apima:",
// 		 "about-us": "2024 Thai House. Visos teisės saugomos.",
// 	},
// 	en: {
// 		"contact-information": "Contact Information",
// 		"Address-Vilnius": "Address Vilnius:",
// 		"working-hours": "Working Hours:",
// 		"day": "Day:",
// 		"monday": "Monday:",
// 		"closed": "Closed",
// 		"tuesday": "Tuesday",
// 		"wednesday": "Wednesday",
// 		"thursday": "Thursday",
// 		"friday": "Friday",
// 		"saturday": "Saturday",
// 		"sunday": "Sunday",
// 		"menu-tr": "Menu",
// 		"reserve-table": "Reserve a Table",
// 		"contacts": "Contacts",
// 		"contact-us": "Leave your details, we will call you back",
// 		"name": "Name:",
// 		"phone": "Phone:",
// 		"email": "Email:",
// 		"your-coment": "Comment:",
// 		"Newsletter": "I agree to the newsletter terms",
// 		"submit": "Submit",
// 		"submitDone": "Submitted!",
// 		"about-title": "Thai Restaurant in Vilnius",
// 		"about-description": "Inspired by the rich culture and unique cuisine of Thailand, we, the restaurant team, aimed to create a space where every guest could enjoy not only delicious dishes but also immerse themselves in the authentic Thai hospitality atmosphere. Our travels through Thailand gave us unforgettable impressions of street food aromas and traditional culinary pleasures. We are excited to share with you authentic flavors and family recipes, making every visit to our restaurant a true immersion into the wonderful world of Thai cuisine and culture.",
// 		"about-menu-text": "The menu of Thai House offers a wide selection of dishes that reflect the unique blend of sweet, sour, spicy, and salty flavors typical of Thai cuisine. Here you can enjoy the traditional Tom Yum soup with seafood and tasty Pad Thai – stir-fried noodles with vegetables and nuts. We also offer many vegetarian dishes made from fresh local ingredients, giving the dishes a rich taste and aroma. The spiciness of the dishes can be customized according to each customer's preference. For dessert, we offer sticky rice pudding with mango and coconut milk, as well as exotic drinks such as Thai tea with milk and fresh coconut water.",
// 		"main-menu": "Main Menu",
// 		"drinks": "Drinks",
// 		"social-media": "Follow us on social media to get the latest updates!",
// 		"about-us": "About Us",
// 		"vision": "The owner of Thai House restaurant dreams of creating a unique space where guests can enjoy the authentic atmosphere of Thailand. The goal is to offer authentic Thai dishes made from fresh local ingredients so that every guest can experience the true taste of Thai cuisine. His ideas include:",
// 		"about-us": "2024 Thai House. All rights reserved."
// 	},
	
	
// 	ua: {
// 		"contact-information": "Контактна інформація",
// 		"Address-Vilnius": "Адреса Вільнюс:",
// 		"working-hours": "Години роботи:",
// 		"day": "День:",
// 		"monday": "Понеділок:",
// 		"closed": "Закрито",
// 		"tuesday": "Вівторок",
// 		"wednesday": "Середа",
// 		"thursday": "Четвер",
// 		"friday": "Пʼятниця",
// 		"saturday": "Субота",
// 		"sunday": "Неділя",
// 		"menu-tr": "Меню",
// 		"reserve-table": "Забронювати столик",
// 		"contacts": "Контакти",
// 		"contact-us": "Залиште свої дані, ми вам зателефонуємо",
// 		"name": "Ім'я:",
// 		"phone": "Телефон:",
// 		"email": "Електронна пошта:",
// 		"your-coment": "Коментар:",
// 		"Newsletter": "Я погоджуюсь з умовами підписки на новини",
// 		"submit": "Подати",
// 		"submitDone": "Подано!",
// 		"about-title": "Тайський ресторан у Вільнюсі",
// 		"about-description": "Натхненні безмежним багатством культури Таїланду та унікальною кухнею, ми, команда ресторану, прагнули створити простір, де кожен гість може насолодитися не лише смачними стравами, а й справжньою атмосферою тайського гостинності. Наші подорожі по Таїланду подарували нам незабутні враження від ароматів вуличної їжі та традиційних кулінарних задоволень. Ми раді поділитися з вами автентичними смаками та сімейними рецептами, щоб кожен візит до нашого ресторану став справжнім зануренням у чудовий світ тайської кухні та культури.",
// 		"about-menu-text": "Меню «Thai House» пропонує великий вибір страв, що відображають унікальне поєднання солодких, кислих, гострих і солоних смаків, характерних для тайської кухні. Тут ви можете скуштувати традиційний суп Том Ям з морепродуктами та смачний Пад Тай – смажені локшини з овочами та горіхами. Також ми пропонуємо безліч вегетаріанських страв, приготованих зі свіжих місцевих інгредієнтів, які надають стравам глибокий смак і аромат. Гостроту страв можна налаштувати відповідно до побажань клієнта. На десерт ми пропонуємо липкий рисовий пудинг з манго та кокосовим молоком, а також екзотичні напої, такі як тайський чай з молоком і свіжу кокосову воду.",
// 		"main-menu": "Основне меню",
// 		"drinks": "Напої",
// 		"social-media": "Слідкуйте за нами в соціальних мережах, щоб отримувати новини!",
// 		"about-us": "Про нас",
// 		"vision": "Власник тайського ресторану «Thai House» мріє створити унікальний простір, де гості можуть насолоджуватися справжньою атмосферою Таїланду. Ми прагнемо запропонувати автентичні тайські страви, приготовані зі свіжих місцевих інгредієнтів, щоб кожен гість отримав справжній досвід тайської кухні. Його ідеї включають:",
// 		"about-us": "2024 Thai House. Усі права захищені."
// 	}
// };