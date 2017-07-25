(function (angular) {
    "use strict";

    angular.module('platform').directive('nswFormValidateTip', ['$translate',
        function ($translate) {
            return {
                restrict: 'A',
                scope: {
                    settings: '='
                },
                templateUrl: globals.basAppRoute + '/components/nsw-form/templates/nsw-form-validate-tip.html',
                link: function (scope) {
                    scope.errors = {};


                    var isModelValid = function () {
                        return scope.settings && scope.settings.ngModel;
                    };

                    var formatTranslateKey = function (str) {
                        return str.replace(/([a-z]*)([A-Z])([a-z]*)/g, function (src, $1, $2, $3) {
                            return $1 + '-' + _.lowerCase($2) + $3;
                        });
                    };

                    var translateValidations = function translateValidations(errors) {
                        if (!isModelValid()) {
                            return;
                        }
                        var keys = _.map(errors, function (key, prop) {
                            return prop;
                        });

                        return $translate(keys);
                    };

                    var isDefinedAttr = function (attr) {
                        var formInput = scope.settings.element;
                        return !_.isUndefined(formInput.attr(attr));
                    };

                    var translateTip = function translateTip(key, tip) {
                        tip = tip||'';
                        var formInput = scope.settings.element;
                        return tip.replace(/(%[^%]+%)/ig, function (tip, code) {
                            code = code.replace(/%/ig, '');
                            code = formatTranslateKey(code);
                            var nswCode = 'nsw-' + code,
                                dataCode = 'data-' + code,
                                dataNswCode = 'data-nsw-' + code;


                            if (code === 'label') {
                                return scope.settings.label;
                            } else if (isDefinedAttr(code)) {
                                return formInput.attr(code);
                            } else if (isDefinedAttr(nswCode)) {
                                return formInput.attr(nswCode);
                            } else if (isDefinedAttr(dataCode)) {
                                return formInput.attr(dataCode);
                            } else if (isDefinedAttr(dataNswCode)) {
                                return formInput.attr(dataNswCode);
                            } else {
                                console.warn('platformNswFormValidateTip:validation error code [' + code + '] not found!');
                            }
                        });
                    };
                    var translateExp = function translateExp(error) {
                        return error.replace(/#\{([^}]+)}/g, function (src, $0) {
                            var translated = translateTip($0, function (translated) {
                                translated = translated.replace(/(%[^%]+%)/ig, '');
                                return '\'' + translated + '\'';
                            });
                            return eval(translated);//jshint ignore:line
                        });
                    };
                    var updateErrorTips = function updateErrorTips() {
                        if (!isModelValid()) {
                            return;
                        }
                        var errors = scope.settings.ngModel.$error;
	                    scope.errors = {};
                        translateValidations(errors).then(function (result) {
                            _.forEach(result, function (tip, key) {
                                var translatedTip = translateExp(tip);
                                translatedTip = translateTip(key, translatedTip);
                                scope.errors[key] = {
                                    name: key,
                                    tip: translatedTip,
                                    invalid: errors[key]
                                };
                            });
                        });
                    };


                    var watcher = scope.$watchCollection(function () {
                        if (!isModelValid()) {
                            return;
                        }
                        var errors = scope.settings.ngModel.$error;
                        return _.map(errors, function (val) {
                            return val;
                        });
                    }, function (newVal) {
                        if (newVal) {
                            updateErrorTips();
                        }
                    });

                    updateErrorTips();

                    scope.$on('$destroy', function () {
                        watcher();
                    });
                }
            };
        }]);
}(angular));