// ==UserScript==
// @name         PrivateSIS
// @namespace    https://faisaln.com/scripts/privatesis
// @version      1.0.0
// @description  Ensure that private and personal information in Ellucian SIS is blurred or disabled. Used during usability testing of the new Ellucian SIS.
// @author       Faisal N
// @match        https://sis9.rpi.edu/*
// @match        https://experience.elluciancloud.com/*
// @match        https://degreeworksprd.rpi.edu/*
// @match        https://degreeworksprd.rpi.edu:8708/*
// @match        https://commerce.cashnet.com/*
// @icon         https://lamp2.server.rpi.edu/pl-base/public/images/RPI_Logo_White.svg
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/faisalnjs/privatesis/refs/heads/main/userscript.js
// @downloadURL  https://raw.githubusercontent.com/faisalnjs/privatesis/refs/heads/main/userscript.js
// @supportURL   https://faisaln.com
// @source       https://faisaln.com/scripts/privatesis
// ==/UserScript==

(function () {
    'use strict';
    GM_addStyle(`
        @-moz-document domain("sis9.rpi.edu"), domain("experience.elluciancloud.com"), domain("degreeworksprd.rpi.edu"), domain("degreeworksprd.rpi.edu:8708") {
            .MuiAvatar-root,
            .MuiPaper-root:has([title="Degree Works"]),
            .student-p-other-navigation-list-default:not(.isEnabled),
            .landing-path:not(.landingPreRegisterActivities):not(.landingBrowseClasses),
            .print-button {
                user-select: none !important;
                pointer-events: none !important;
            }

            tile-box:not(.notBlurred),
            .student-info-photo,
            .notes-container,
            .cirriculum-container,
            .profile-item:not(.dropdown),
            #title-panel h1:not(.notBlurred),
            .account-summary-inner-body > .ng-scope {
                filter: blur(5px) !important;
                user-select: none !important;
                pointer-events: none !important;
            }

            #overall_academic_standing_li {
                display: none !important;
            }
        }

        @-moz-document domain("commerce.cashnet.com") {
            html, body, * {
                user-select: none !important;
                pointer-events: none !important;
            }

            .account-summary-inner-body > .ng-scope,
            .balance__amount,
            .overview-body-container {
                filter: blur(5px) !important;
                user-select: none !important;
                pointer-events: none !important;
            }
        }
    `);
    if (window.location.href.includes('experience.elluciancloud.com')) {
        setInterval(() => {
            [...document.querySelectorAll('.MuiPaper-root')].forEach(item => {
                if (item.innerHTML.includes('Employee') || item.innerHTML.includes('Degree Works') || item.innerHTML.includes('General Dashboard') || item.innerHTML.includes('Personal Info')) {
                    item.style.pointerEvents = 'none';
                    item.style.userSelect = 'none';
                };
            });
        }, 500);
    };
    if (window.location.href.includes('sis9.rpi.edu')) {
        setInterval(() => {
            [...document.querySelectorAll('#title-panel h1')].forEach(item => {
                if (item.innerHTML.includes('(') && item.innerHTML.includes(')')) item.innerHTML = item.innerHTML.replace(/\(.*?\)/g, '(*********)');
                item.classList.add('notBlurred');
            });
        }, 500);
    };
    if (window.location.href.includes('sis9.rpi.edu/StudentSelfService/financialAid') || window.location.href.includes('sis9.rpi.edu/StudentSelfService/ssb/financialAid')) {
        setInterval(() => {
            [...document.querySelectorAll('tile-box')].forEach(item => {
                if (!item.innerHTML.includes('$') && !item.innerHTML.includes('SAP Status')) item.classList.add('notBlurred');
            });
        }, 500);
    };
    if (window.location.href.includes('sis9.rpi.edu/StudentSelfService/studentProfile') || window.location.href.includes('sis9.rpi.edu/StudentSelfService/ssb/studentProfile')) {
        setInterval(() => {
            [...document.querySelectorAll('.student-p-other-navigation-list-default')].forEach(item => {
                if (!item.innerHTML.includes('Degree Works') && !item.innerHTML.includes('Grades') && !item.innerHTML.includes('Transcript') && !item.innerHTML.includes('Graduate')) item.classList.add('isEnabled');
            });
        }, 500);
    };
    if (window.location.href.includes('commerce.cashnet.com')) {
        setInterval(() => {
            [...document.querySelectorAll('*')].forEach(item => {
                item.setAttribute('tabindex', '-1');
            });
        }, 500);
        if (window.location.href.split('commerce.cashnet.com/cashnetg/static/epayment/RPIpay/overview')[window.location.href.split('commerce.cashnet.com/cashnetg/static/epayment/RPIpay/overview').length - 1] !== '') {
            window.location.href = 'https://commerce.cashnet.com/cashnetg/static/epayment/RPIpay/overview';
        };
    };
})();