export const AssetsPack = {
    Background: {
        background: 'assets/background.jpg',
        BusinessHolder: 'assets/bar_back.png',
        BusinessBuyBack: 'assets/dummy.png',
        BusinessBuyLockedBack: 'assets/dummy_lock.png',
        TimeBar: 'assets/bar.png',
        panelBack: 'assets/panel_back.png'
    },
    button: {
        upgradeButton: 'assets/buy_upgrade.png',
        proceedButton: 'assets/proceed_button.png',
        managersButton: 'assets/managers_button.png',
        closeButton: 'assets/close_button.png',
        hireButton: 'assets/hire_button.png',
    }
}

export const STAGE_SIZE = {
    width: 720,
    height: 520,
}

export const GAME_SAVE_TIME = 1000;
export const Managers = [
    {
        name: 'Ronald McDonald',
        business:'hot_dog',
        description:'He is man of restaurants.',
        hireCost:5
    },
    {
        name: 'Jeff Bezos',
        business: 'store',
        description:'He is man of selling things.',
        hireCost:100
    },
    {
        name: 'Kutay Cimen',
        business: 'real_estate',
        description:'He will make money for you.',
        hireCost:1000
    }
]
export const BusinessConfig = [
    {
        name: 'Hot Dog',
        id:'hot_dog',
        icon: '',
        price: 1,
        income: 1,
        upgradePrice: 4,
        firstUpgradeOdd:0.28,
        upgrade:1,
        levels: [
            {
                name: 'Hot Dog',
                incomeDuration: 1000,
                total: 25,
                upgradeFraction:0.02,
                addPeriod:6
            },
            {
                name: 'Burger House',
                incomeDuration: 500,
                total: 50,
                upgradeFraction:0.02,
                addPeriod:6
            }
        ]
    },
    {
        id:'store',
        name: 'Store',
        icon: '',
        price: 60,
        upgradePrice: 69,
        firstUpgradeOdd:10.35,
        income: 60,
        levels: [
            {
                name: 'Store',
                incomeDuration: 4000,
                total: 25,
                upgradeFraction:1.55,
                addPeriod:4
            },
            {
                name: 'Shop Center',
                incomeDuration: 2000,
                total: 50,
                upgradeFraction:1.55,
                addPeriod:4
            }
        ]
    },
    {
        id:'real_estate',
        name: 'Real Estate',
        icon: '',
        price: 720,
        income: 540,
        upgradePrice: 820,
        firstUpgradeOdd:110,
        levels: [
            {
                name: 'Real Estate',
                incomeDuration: 6000,
                total: 25,
                upgradeFraction:21,
                addPeriod:6,
            },
            {
                name: 'Construction Company',
                incomeDuration: 3000,
                total: 50,
                upgradeFraction:21,
                addPeriod:6
            }
        ]
    }, {
        id:'game_office',
        name: 'Game Office',
        initialDuration: 10,
        icon: '',
        price: 8640,
        income: 4320,
        upgradePrice: 9763,
        firstUpgradeOdd:1269.22,
        levels: [
            {
                name: 'Game Office',
                incomeDuration: 12000,
                total: 25,
                upgradeFraction:164.99,
                addPeriod:4
            },
            {
                name: 'Game Studios',
                incomeDuration: 6000,
                total: 50,
                upgradeFraction:164.99,
                addPeriod:4
            }
        ]
    },

]