// // Pozdravení uživatele
// let vstup = prompt("Zadej svoje jméno:");
// console.log(`Ahoj, tvoje jméno je ${vstup}.`);

// --------------------------------------------------

// // Načtení čísla od uživatele
// let cislo = Number(prompt("Zadej číslo:"));
// if (cislo > 0) {
// 	console.log(`Číslo ${cislo} je kladné.`);
// } else if (cislo === 0) {
// 	console.log(`Číslo je nula.`);
// } else {
// 	console.log(`Číslo ${cislo} je záporné.`);
// }

// --------------------------------------------------

// // Vypsání všech lichých čísel od 1 do 9
// for (let i = 1; i <= 9; i++) {
// 	if (i % 2 === 1) {
// 		console.log(i);
// 	}
// }

// --------------------------------------------------

// // Pozdravení uživatele pomocí funkce

// function pozdravUzivatele() {
// 	let jmeno = prompt("Zadej svoje jméno:");
// 	console.log(`Ahoj, tvoje jméno je ${jmeno}.`);
// }

// pozdravUzivatele();
// pozdravUzivatele();

// --------------------------------------------------

// // Aritmetický průměr tří čísel
// function aritmetickyPrumer(cislo1, cislo2, cislo3) {
// 	let vysledek = (cislo1 + cislo2 + cislo3) / 3;
// 	return vysledek;
// }

// let cislo1 = aritmetickyPrumer(2, 5, 10);
// console.log(cislo1);


// --------------------------------------------------

// // Funkce pro výpočet délky přepony na základě délek obou odvěsen pravoúhlého trojúhelníku
// function delkaPrepony(odvesnaA, odvesnaB) {
// 	let vysledek = Math.sqrt(odvesnaA * odvesnaA + odvesnaB * odvesnaB);
// 	return vysledek;
// }

// let prepona = delkaPrepony(3, 4);
// console.log(prepona);

// --------------------------------------------------

// Funkce pro hod zobecněnou kostkou: na kostce padá náhodně libovolné celé číslo mezi minimum
// (včetně) a maximum (včetně). Pro obvyklou kostkou by se tedy použilo volání hodKostkou(1, 6).
function hodKostkou(minimum, maximum) {
	let vysledek = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	return vysledek;
}

// --------------------------------------------------

// // Házení kostkou tak dlouho, než padne šestka
// let kostka;
// do {
//     kostka = hodKostkou(1, 6);
//     console.log(`Na kostce padlo: ${kostka}.`);
// } while (kostka !== 6);

// --------------------------------------------------

// Funkce pro načtení čísla od uživatele
function nactiCislo() {
	return Number(prompt("Zadej číslo:"));
}

// --------------------------------------------------

// Program na hádání tajného čísla uživatelem

let minimum = 1;
let maximum = 5;
let tajneCislo = hodKostkou(minimum, maximum);
console.log(`Myslím si číslo mezi ${minimum} a ${maximum}. Dokážeš je uhodnout?`)
let hadaneCislo;
do {
	hadaneCislo = nactiCislo();
	if (hadaneCislo < tajneCislo) {
		console.log(`Kdepak, myslím si číslo větší než ${hadaneCislo}.`);
	} else if (hadaneCislo > tajneCislo) {
		console.log(`Kdepak, myslím si číslo menší než ${hadaneCislo}.`);
	} else {
		console.log(`Výborně, uhodla jsi! Skutečně jsem si myslel číslo ${tajneCislo}.`);
	}
} while (hadaneCislo !== tajneCislo);
