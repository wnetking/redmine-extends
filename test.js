var members = {};
var issues = [];


const PLUGIN = {
    NAME: 'AgileBoard for Redmine',
    VERSION: '2.2.1',
    AUTHOR: {
        NAME: 'Doctor',
        LINK: 'https://t.me/doctor_serpstat',
    },
};

class BoardSettings {
    constructor() {
        $('body.controller-agile_boards').prepend('<div id="board-loader"><div class="loader"><div class="green-bar" ></div></div></div>');
        this.loader = $('#board-loader');
        this.loaderBar = $('#board-loader .green-bar');

        this.loaderBarClear();

        this.showLoader();
        this.init();

        // this.fixSettings();
        this.createMemberFilter();
        this.createSearchFilter();
        this.addPluginInfo();
        this.createRefreshButton();
    }

    init() {
        $('#wrapper').prepend('<div id="board-settings"></div>');
        this.block = $('#board-settings');
    }

    showLoader() {
        this.loader.show();
    }

    setIssueCardCount(count) {
        this.countIssuesCards = count;
    }

    loaderBarClear() {
        this.loaderBarStep = 0;
        this.loaderBarSetPercent(0);
        this.setIssueCardCount(0);
    }

    loaderBarAddStep() {
        this.loaderBarStep++;
        let pt = 100 / this.countIssuesCards * this.loaderBarStep
        this.loaderBarSetPercent(pt);
    }

    loaderBarSetPercent(pt) {
        this.loaderBar.css({width: pt + "%"})
    }

    hideLoader() {
        this.loader.hide();
    }

    fixSettings() {
        this.block.removeClass("fixed");

        if ($('.list.issues-board.sticky').is(':visible')) {
            this.block.addClass("fixed");
        }
        return this;
    }

    createMemberFilter() {
        if (this.memberListBlock === undefined) {
            this.block.append('<div class="board-setting-block members-list-wrapper"><div id="members-list"></div></div>')
            this.memberListBlock = $('#members-list');
        }
        this.memberListBlock.html('');
        this.memberListBlock.prepend('<label><input id="showAll" type="checkbox" value="all" checked="checked"> <b>Все участники</b></label>');

        let arr = Object.keys(members).sort();

        let objMemberListBlock = this.memberListBlock;
        arr.forEach(function (item) {
            let member = members[item];
            if (member === 'undefined' || member === 'null') {
                return false;
            }
            objMemberListBlock.append('<label ><input type="checkbox" value="' + member + '"> ' + member + '</label>');
        });
        objMemberListBlock
            .removeClass('col1')
            .removeClass('col2')
            .removeClass('col3')
        ;
        let colNum = 1;
        if (arr.length > 4 && arr.length < 9) {
            colNum = 2;
        } else if (arr.length > 8) {
            colNum = 3;
        }
        objMemberListBlock.addClass('col' + colNum);
    }

    createRefreshButton() {
        this.block.prepend('<div class="board-setting-block"><button id="refresh-board-button" title="Обновить таблицу"></button></div>')

    }

    createSearchFilter() {
        this.block.prepend('<div class="board-setting-block" id="search-filter-wrapper"><input id="search-filter" type="text" placeholder="Search by id"></div>')

    }

    searchFilterFocus() {
        $('#search-filter').focus();
    }

    addPluginInfo() {
        this.block.append('<div class="board-setting-block-r" id="plugin-info"><span>' + PLUGIN.NAME + ' by <a target="_blank" href="' + PLUGIN.AUTHOR.NAME + '">' + PLUGIN.AUTHOR.NAME + '</a></span> <b>v.' + PLUGIN.VERSION + '</b></div>')

    }

    refreshButtonActivate() {
        $('#refresh-board-button').prop('disabled', true).addClass('active').attr('title', 'Подождите, идёт обновление таблицы');
    }

    refreshButtonDiactivate() {
        $('#refresh-board-button').prop('disabled', false).removeClass('active').attr('title', 'Обновить таблицу');
    }

    refreshContent() {
        let action = 'Board update';
        console.log(action, 'start');
        this.refreshButtonActivate();
        let that = this;

        $('body').prepend('<iframe id="refresh-content" src="' + location.href + '">');

        $('#refresh-content').load(function () {
            console.log(action, 'iframe loaded');

            let iframeDom = $(this).contents();
            boardSettings.setIssueCardCount(iframeDom.find('.issue-card ').length);
            $.each(iframeDom.find('.issue-card'), function (k, v) {
                callback = null
                if (k === iframeDom.find('.issue-card ').length - 1) {
                    callback = function () {
                        console.log(action, 'modify data');

                        $('.issue-status-col').each(function (k, col) {
                            $(col).html(' ');
                            let content = iframeDom.find('.issue-status-col[data-id="' + $(col).data('id') + '"]').html();
                            content = content.replace(/\$\(\"#checklist_\d+\"\)\.checklist\(\)\;/ig, "");
                            $(col).html(content);
                        });
                        $("table.issues-board thead").html(iframeDom.find("table.issues-board thead").html());
                        $('#refresh-content').remove();

                        console.log(action, 'update issue cards');
                        issues.forEach(function (node) {
                            node.updateCard();
                        });
                        $('#search-filter').keyup();
                        that.refreshButtonDiactivate();
                        boardSettings.hideLoader();

                        console.log(action, 'complite');
                    }
                }
                IssueCard.asyncCreateIssueCardObject(
                    $(v),
                    boardSettings,
                    callback
                );
            });
        });
    }

    resizeCol() {
        $('.slims').removeClass('slims');

        $('.issue-status-col').each(function (k, v) {
            if ($(v).find('.visible').length === 0
                && $(v).find('.visible-search').length === 0
                && $(v).find('.visible-relation').length === 0
            ) {
                let id = $(v).data('id');
                let th = $(v).parents('.issues-board')
                    .find('th[data-column-id="' + id + '"]');

                th.addClass('slims').attr('title', th.text());
            }
        });
    }

    selectDefaultColumn() {
        let disabledField = [
            'project',
        ];
        let enabledStatuses = [
            1, 2, 4, 27,
        ];


        $('.options tr:nth-child(2) .card-fields .floating input').prop('checked', true);
        $('.options tr:nth-child(2) .card-fields .floating input[value="project"]').prop('checked', false);
    }
}

var boardSettings = new BoardSettings();

class IssueCard {

    constructor(card, boardSettings, apiData) {
        this.boardSettings = boardSettings;
        this.card = card;
        this.apiData = apiData;
        this.id = card.data('id');
        this.card.attr('id', 'i-' + this.id);

        try {
            this.init();
        } catch (e) {
            console.error('Error create IssueCard object #' + this.id, e, this)
        }

    }

    static get STATUS() {
        return {
            NEW: 1,
            IN_PROGRESS: 2,
            SUSPENDED: 11,
            CLOSED: 5,
        }
    }

    updateCard() {
        this.card = $('#i-' + this.id);
    }

    init() {

        this.status = this.apiData.status.id;
        this.tracker = this.apiData.tracker.name;
        this.priority = this.apiData.priority.name;

        this.addMember(this.apiData.assigned_to.name);


        this.addClass(this.tracker)
            .addClass('i-' + this.id)
            .addClass('visible')
            .addClass('custom-issue-card')
            .addClass('p-' + this.priority)
        ;


        this.findAttributes();
        this.initHoursBlock();

        this.markRelationTasks();

        this.hideElement(this.attr, 'Инфо');
        this.hideElement(this.card.find('.last_comment'), 'Комментарий');
        this.hideElement(this.card.find('.checklist'), "Чеклист");

        this.checkOldTimeStatus();
    }


    static asyncCreateIssueCardObject(card, boardSettings, callback = null) {
        let id = card.data('id');
        getAjaxData(
            'https://redmine.netpeak.net/issues/' + id + '.json?include=children',
            function (data) {
                issues[id] = {};
                issues[id] = new IssueCard(card, boardSettings, data.issue);
                boardSettings.loaderBarAddStep();
                if (typeof callback === "function") {
                    callback();
                }
            },
            function (e) {
                console.error('Error get API data issue #' + id, e);
            }
        );

    }

    getCustomData(name) {
        let data = '';

        this.apiData.custom_fields.forEach(function (item) {
            if (item['name'] === name) {
                data = item['value'];
                return false;
            }
        });
        return data;
    }

    initHoursBlock() {
        let hours = this.card.find('.hours');
        if (hours.length === 0) {
            this.card.find('.issue-id').append('<span class="hours"></span>');
            hours = this.card.find('.hours');
        }
        this.hoursBlock = hours;
        this.updateHourseBlock();

    }

    updateHourseBlock() {
        if (this.status === IssueCard.STATUS.CLOSED) {
            return false;
        }

        let estimetedTime = 0;
        if (this.apiData.estimated_hours !== undefined) {
            estimetedTime = this.apiData.estimated_hours;
        }
        let realTime = Number(parseFloat(this.apiData.spent_hours).toPrecision(2));

        this.hoursBlock.html(realTime + " / " + estimetedTime + "ч.");

        let isRed = false;
        if (estimetedTime === 0 || realTime > estimetedTime) {
            isRed = true;
        }


        if (this.tracker === 'Story' || this.tracker === 'Duty') {
            let sp = this.getCustomData('Story Points');
            if (sp === '') sp = 0;
            let h = Number(parseFloat(this.apiData.total_spent_hours).toPrecision(2));
            isRed = false;
            this.hoursBlock.html("<b class='green'>SP " + sp + "</b><br>T: " + h + "ч.")
            if (h > 50) {
                isRed = true;
            }
        }

        if (isRed) {
            this.hoursBlock.addClass('red');
        }
    }

    markRelationTasks() {
        this.parent = null;
        this.childs = [];
        if (this.apiData.parent !== undefined) {
            this.parent = this.apiData.parent.id;
            this.card
                .attr("data-parent", this.parent)
                .addClass("p-" + this.parent);
        }
        if (this.apiData.children !== undefined) {
            let parent = this;
            this.apiData.children.forEach(function (child) {
                parent.childs.push(child.id);
            });
        }
    }

    findAttributes() {
        this.attr = $(this.card.find('.attributes')[0]);
        this.attr.addClass('hidden-attr');
        this.statusTime = $(this.card.find('.attributes')[1]);
        this.statusTime.addClass('status-time');
    }

    addClass(className) {
        this.card.addClass(className);
        return this;
    }

    hasClass(className) {
        return this.card.hasClass(className);
    }

    removeClass(className) {
        this.card.removeClass(className);
        return this;
    }

    addMember(member) {
        if (member === undefined || member === null) {
            return false;
        }
        member = member[0].toUpperCase() + member.slice(1);
        members[member] = member;

        let memberBlock = this.card.find('.user.active');
        if (memberBlock.length) {
            memberBlock.html(member);
        }

        this.addClass(member);
        this.boardSettings.createMemberFilter();
    }

    hideElement(el, text, altText) {
        el.hide()
            .before(this.createToggleLink(text, altText));
    }

    createToggleLink(text, altText) {
        if (text === undefined) {
            text = 'Показать';
        }
        if (altText === undefined) {
            altText = 'Скрыть';
        }
        return "<p class='toggle' data-text='" + altText + "'>" + text + "</p>";
    }

    checkOldTimeStatus() {
        let statusTimeString = this.statusTime.html();
        if (statusTimeString === null) {
            statusTimeString = '';
        }

        let data = statusTimeString.match(/<b>\s*В статусе:\s*<\/b>\s*(\d+)\s(\W)/i);

        let res = false;
        if (data != null) {
            if ((data[2] === 'д' && data[1] > 1) || (data[2] === 'ч' && data[1] > 7)) {
                res = true;
            }
        }

        if (res === true) {
            this.statusTime.addClass('red');
        }
    }

    get hasParent() {
        return this.parent ? true : false;
    }

    get hasChilds() {
        return this.childs.length ? true : false;
    }

    get hasRelations() {
        return this.hasChilds || this.hasParent;
    }
}

function getAjaxData(url, success, error) {
    $.ajax({
        url: url,
        type: "get",
        dataType: "json",
        async: true,
        success: success,
        error: error,
    });
}


function selectSprints(sprints) {
    $('#values_fixed_version_id_1')
        .attr('multiple', 'multiple')
        .attr('size', 10)
    ;

    let sprintValues = [];
    $('#values_fixed_version_id_1').find('option').each(function (k, v) {
        let regexp = new RegExp('(' + sprints + ')', "i");
        let text = $(v).text();
        if (text.match(regexp)) {
            sprintValues.push($(v).val())
        }
    });
    $('#values_fixed_version_id_1').val(sprintValues);


}

function createSprintFilter() {
    let sprintsFilter = localStorage.getItem('sprintsFilter');
    let text = 'Указать номера спринтов, разделять любым не цифровым символом';
    $('#tr_fixed_version_id td.values').append("<div id='sprint-selector-block'>" + text + "<br><input id='sprint-selector' value='" + sprintsFilter + "'> <button id='sprint-selector-btn' type='button'>Выбрать спринты</button></div>");
}


function observeAddNewChilde() {
    let targetNode = document.querySelector('.container-fixed');
    if (targetNode === null) {
        return false;
    }
    let config = {attributes: false, childList: true, subtree: true};
    let callback = function (mutationsList, observer) {
        if (mutationsList.length === 0) {
            return false;
        }
        for (let mutation of mutationsList) {
            if (mutation.type == 'childList' && mutation.addedNodes.length > 0 && $(mutation.addedNodes[0]).hasClass('issue-card')) {
                let node = mutation.addedNodes[0];
                if ($(node).hasClass('custom-issue-card') === false) {
                    IssueCard.asyncCreateIssueCardObject(
                        $(node),
                        boardSettings,
                        callback
                    );
                }
            }
        }
        boardSettings.resizeCol();

    };
    let observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

}

class IssueFinder {

    find(searchId) {
        try {
            this.checkEmptySearch(searchId);
            this.clearPreviousSearch();
            let resultCard = this.checkResult(searchId);
            this.checkRelationSearch(resultCard);

        } catch (e) {
            switch (e.name) {
                case 'EmptySearch':
                    this.cancel();
                    break;
                case 'IssueNotFound':
                    break;
                default:
                    console.log('Cобытие: ', e);
            }
        } finally {
            boardSettings.resizeCol();
        }

    }


    checkEmptySearch(searchId) {
        if (searchId === '') {
            throw new Event('EmptySearch');
        }
    }

    checkResult(searchId) {
        $('.custom-issue-card').addClass('not-that');
        if (issues[searchId] === undefined) {
            throw new Event('IssueNotFound');
        }


        let issueCard = issues[searchId];
        issueCard.removeClass('not-that');

        if (issueCard.hasClass('visible') === false) {
            issueCard.addClass('visible-search');
        }

        issueCard.removeClass('not-that').card.slideDown();

        $(document.documentElement).animate({
            scrollTop: issueCard.card.offset().top - 50
        }, 1000);
        return issueCard;

    }

    checkRelationResult(searchId, recursia = false) {

        if (issues[searchId] === undefined) {
            throw new Event('IssueNotFound');
        }

        let issueCard = issues[searchId];

        issueCard.removeClass('not-that').addClass('visible-relation');

        if (issueCard.hasClass('visible') === false) {
            issueCard.slideDown();
        }
        console.log('Relation find', searchId, issueCard);

        if (recursia) {
            this.checkRelationSearch(issueCard);
        }
        boardSettings.resizeCol();

        return issueCard;

    }

    checkRelationSearch(resultCard) {
        if (false === resultCard.hasRelations) {
            return false;
        }
        try {
            this.checkRelationResult(resultCard.parent, true);
        } catch (e) {
        }

        let that = this;
        resultCard.childs.forEach(function (id) {
            try {
                that.checkRelationResult(id);
            } catch (e) {
            }
        });

    }


    cancel() {
        $('.not-that').removeClass('not-that');
        this.clearPreviousSearch();
        boardSettings.resizeCol();
    }

    clearPreviousSearch() {
        $('.visible-search').removeClass('visible-search');
        $('.visible-relation').removeClass('visible-relation');
        $('.custom-issue-card:not(.visible)').slideUp();
    }


}

function Event(name) {
    this.message = 'not error';
    this.cause = {};
    this.name = name;
    this.stack = [];
}

Event.prototype = Object.create(Error.prototype);
Event.prototype.constructor = Event;


function useMemberFilter(member) {
    console.log(member);
    if (member == 'all') {
        $('#members-list input:checked').prop("checked", false)
        $('#showAll').prop("checked", true);
        $('.custom-issue-card').addClass('visible').slideDown();
    } else {
        let names = [];
        $('#showAll').prop("checked", false)
        $('#members-list input:checked').each(function (k, v) {
            names.push('.' + $(v).val());
        });

        if (names.length > 0) {
            $('.custom-issue-card').removeClass('visible').hide();
            $(names.join(',')).addClass('visible').slideDown();
        } else {
            $('#showAll').prop("checked", true).change();
        }
    }
    boardSettings.resizeCol();

}

function autoRefreshContent(time = 1) {
    setInterval(function () {
        boardSettings.refreshContent();
    }, time * 1000 * 60);
}

$(document).ready(function () {
    if ($('body').hasClass('controller-agile_boards') === false) {
        return false;
    }

    createSprintFilter();

    $('#sprint-selector').keypress(function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    })
    $('body').on('click', '#sprint-selector-btn', function (e) {
        let sprintFilter = $('#sprint-selector').val().trim().replace(/(\D)/ig, '|')

        selectSprints(sprintFilter);
        localStorage.setItem('sprintsFilter', sprintFilter);
        $("#query_form").submit();
    });


    $('body').on('click', '.toggle', function () {
        let text = $(this).text();
        let altText = $(this).data('text');

        $(this).data('text', text).text(altText);

        $(this).next().slideToggle();
    });

    let issueFinder = new IssueFinder();
    $('body').on('keypress', '#search-filter', function (e) {
        if (e.keyCode < 48 || e.keyCode > 57) {
            return false;
        }
    }).on('focus', '#search-filter', function () {
        $(this).select();
    }).on('keyup', '#search-filter', function () {
        issueFinder.find($(this).val());
    }).on('change', '#search-filter', function () {
        issueFinder.find($(this).val());
    });

    $('body').on('change', '#members-list input', function () {
        useMemberFilter($(this).val());
        return false;
    }).on('click', '#board-settings', function (e) {
        if (e.target === this) {
            boardSettings.searchFilterFocus();
        }
    }).on('click', '#refresh-board-button', function (e) {
        boardSettings.loaderBarClear();
        boardSettings.showLoader();

        boardSettings.refreshContent();
    });


    if ($('.issue-card ').length === 0) {
        boardSettings.hideLoader();
    }

    $.each($('.issue-card '), function (k, v) {
        boardSettings.setIssueCardCount($('.issue-card ').length);
        callback = null
        if (k === $('.issue-card ').length - 1) {
            callback = function () {
                boardSettings.hideLoader();
                boardSettings.searchFilterFocus();
            }
        }
        IssueCard.asyncCreateIssueCardObject(
            $(v),
            boardSettings,
            callback
        );
    });

    observeAddNewChilde();

    boardSettings.resizeCol();
    boardSettings.searchFilterFocus();

});
