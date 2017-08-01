    var campaigns = {
        'Asia Nueva' : 'Climas - Artistic Metropol',
        'Campaña de UK e Irlanda' : 'Línea de meta - Cinesmax Petrer',
        'Ciudades Mundo' : 'Los Goonies - Multicines Avenida',
        'Mobile Mundo' : 'El Padrino -Cines Megarama',
        'Mundo entero' : 'Patuchas, el hombre de los mil limones - Guadalquivir Cinemas',
        'Mundo entero clone - MOBILE' : 'La princesa prometida - Los Arcos Multicines',
        'North America Nueva' : 'La historia interminable - Neocine Thader',
        'SIM' : 'Todo es de color - Aragó Cinema',
        'Travel to Spain' : 'Awake. Despierta: La vida de Yogananda - Palacio de la Prensa',

    }
    function generateTable(data){
        var investment = data;

        $('.compassuite-investment-table').empty();

        if(investment['notOptimize']['direct_lines'].length != 0){
            var general = investment['notOptimize']['direct_lines']['general'];
            if(general['best'] == null || general['worst'] == null){
                var best = "";
                if(general['best'] != null){
                    best = best_string;
                }
                var worst = "";
                if(general['worst'] != null){
                    worst = worst_string;
                }
            }
            var html =
                '<tr>' +
                    '<td>'+best+worst+'</td>' +
                    '<td>'+general['source']+'</td>' +
                    '<td>'+general['transactions']+'</td>' +
                    '<td>'+parseFloat(general['revenue']).toFixed(2)+'</td>' +
                    '<td>'+parseFloat(general['investment']).toFixed(2)+'</td>' +
                    // '<td>'+parseFloat(general['transactions_costs']).toFixed(2)+'</td>'+
                    '<td class="externalCostsTd">'+parseFloat(general['external_costs']).toFixed(2)+'</td>'+
                    '<td>'+parseFloat(general['profits']).toFixed(2)+'</td>' +
                    '<td></td>' +
                    '<td class="advice"></td>' +
                    '<td class="advice"></td>' +
                '</tr>';
            $('.compassuite-investment-table').append(html);
        }

        if(investment['notOptimize']['seo_lines'].length !=0){
            var general = investment['notOptimize']['seo_lines']['general'];
            optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = general['optimized_investment'].toFixed(2);
            }
            if(general['best'] == null || general['worst'] == null){
                var best = "";
                if(general['best'] != null){
                    best = best_string;
                }
                var worst = "";
                if(general['worst'] != null){
                    worst = worst_string;
                }
            }
            var up = "";
            if(general['up'] == 2){
                up = up_string;
            }else if(general['up'] == 1){
                up = down_string;
            }else if(general['up'] == 0){
                up = down_string;
            }
            var prop = "";
            var roi = "";
            if(general['prop'] != null){
                roi = general['roi'].toFixed(2);
                if(general['prop_mes_anterior'] != null){
                    if(general['optimized_investment']> general['investment']){
                        prop = prop_up;
                    }else if(general['optimized_investment'] == general['investment']){
                        prop = prop_keep;
                    }else{
                        prop = prop_down;
                    }
                }
            }
            if(general['hasEnoughInvestment'] == 1 && (general['investment'] != 0 || general['external_costs'] != 0)){
                roi = general['roi'].toFixed(2);
            }else{
                //prop = hasnotEnoughIvestment;
            }
            var identifier = "organics";
            var dataTarget = ".SEO";
            addHtmlInvestment(general, identifier, best, worst, up, dataTarget, roi, prop, optimized_investment);
            var lines = investment['notOptimize']['seo_lines'][0];
            if(lines.length != 0){
                $.each(lines, function (i, line) {
                    optimized_investment = "";
                    if(line['optimized_investment'] != null){
                        optimized_investment = line['optimized_investment'].toFixed(2);
                    }
                    best = "";
                    if(line['best'] != null){
                        best = best_string;
                    }
                    worst = "";
                    if(line['worst'] != null){
                        worst = worst_string;
                    }
                    var up = "";
                    if(line['up'] == 2){
                        up = up_string;
                    }else if(line['up'] == 1){
                        up = down_string;
                    }else if(line['up'] == 0){
                        up = down_string;
                    }
                    var roi = "";
                    var prop = "";
                    if(line['prop'] != null){
                        roi = line['roi'].toFixed(2);
                        if(line['prop_mes_anterior'] != null){
                            if(line['optimized_investment'] > line['investment']){
                                prop = prop_up;
                            }else if(line['investment'] == line['optimized_investment']){
                                prop = prop_keep;
                            }else{
                                prop = prop_down;
                            }
                        }
                    }else {
                        if (general['hasEnoughInvestment'] == 1 && (general['investment'] != 0 || general['external_costs'] != 0)) {
                            if ((general['transactions'] / lines.length) / 2 >= line['transactions']) {
                                prop = makeSeo;
                            }
                        }
                    }
                    var name = "collapse SEO";
                    addHtml2Investment(line, best, worst, up, roi, prop, optimized_investment, name);
                });
            }
        }

        if(investment['optimize']['referral_lines'].length !=0){
            var general = investment['optimize']['referral_lines']['general'];
            var optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = (general['optimized_investment']).toFixed(2);
            }
            if(general['best'] == null || general['worst'] == null){
                var best = "";
                if(general['best'] != null){
                    best = best_string;
                }
                var worst = "";
                if(general['worst'] != null){
                    worst = worst_string;
                }
            }
            var up = "";
            if(general['up'] == 2){
                up = up_string;
            }else if(general['up'] == 1){
                up = down_string;
            }else if(general['up'] == 0){
                up = down_string;
            }
            var prop = "";
            var roi = "";
            if(general['prop'] != null){
                roi = general['roi'].toFixed(2);
                if(general['prop_mes_anterior'] != null){
                    if(general['prop']> general['prop_mes_anterior']){
                        prop = prop_up;
                    }else if(general['prop'] == general['prop_mes_anterior']){
                        prop = prop_keep;
                    }else{
                        prop = prop_down;
                    }
                }
            }
            var identifier = "referrals";
            var dataTarget = ".referral";
            addHtmlInvestment(general, identifier, best, worst, up, dataTarget, roi, prop, optimized_investment);
            var lines = investment['optimize']['referral_lines'][0];
            if(lines.length != 0){
                $.each(lines, function (i, line) {
                    optimized_investment = "";
                    if(line['optimized_investment'] != null){
                        optimized_investment = line['optimized_investment'].toFixed(2);
                    }
                    best = "";
                    if(line['best'] != null){
                        best = best_string;
                    }
                    worst = "";
                    if(line['worst'] != null){
                        worst = worst_string;
                    }
                    var up = "";
                    if(line['up'] == 2){
                        up = up_string;
                    }else if(line['up'] == 1){
                        up =down_string;
                    }else if(line['up'] == 0){
                        up = down_string;
                    }
                    var roi = "";
                    var prop = "";
                    if(line['prop'] != null){
                        roi = line['roi'].toFixed(2);
                        if(line['prop_mes_anterior'] != null){
                            if(line['optimized_investment'] > line['investment']){
                                prop = prop_up;
                            }else if(line['investment'] == line['optimized_investment']){
                                prop = prop_keep;
                            }else{
                                prop = prop_down;
                            }
                        }
                    }
                    var name = "collapse referral";
                    addHtml2Investment(line, best, worst, up, roi, prop, optimized_investment, name);
                });
            }
        }

        if(investment['optimize']['adwords_lines'].length !=0){
            var general = investment['optimize']['adwords_lines']['general'];
            optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = (general['optimized_investment']).toFixed(2);
            }
            if(general['best'] == null || general['worst'] == null){
                var best = "";
                if(general['best'] != null){
                    best = best_string;
                }
                var worst = "";
                if(general['worst'] != null){
                    worst = worst_string;
                }
            }
            var up = "";
            if(general['up'] == 2){
                up = up_string;
            }else if(general['up'] == 1){
                up = down_string;
            }else if(general['up'] == 0){
                up = down_string;
            }
            var prop = "";
            var roi = "";
            if(general['prop'] != null){
                roi = general['roi'].toFixed(2);

                if(general['prop_mes_anterior'] != null){
                    if(general['prop']> general['prop_mes_anterior']){
                        prop = prop_up;
                    }else if(general['prop'] == general['prop_mes_anterior']){
                        prop = prop_keep;
                    }else{
                        prop = prop_down;
                    }
                }
            }
            var optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = general['optimized_investment'].toFixed(2);
            }
            var identifier = "adwords";
            var dataTarget = ".adwords";
            addHtmlInvestment(general, identifier, best, worst, up, dataTarget, roi, prop, optimized_investment);

            var lines = investment['optimize']['adwords_lines'][0];
            if(lines.length != 0){
                $.each(lines, function (i, line) {
                    best = "";
                    if(line['best'] != null){
                        best = best_string;
                    }
                    worst = "";
                    if(line['worst'] != null){
                        worst = worst_string;
                    }
                    var up = "";
                    if(line['up'] == 2){
                        up = up_string;
                    }else if(line['up'] == 1){
                        up = down_string;
                    }else if(line['up'] == 0){
                        up = down_string;
                    }
                    var roi = "";
                    var prop = "";
                    if(line['prop'] != null){
                        roi = line['roi'].toFixed(2);
                        if(line['prop_mes_anterior'] != null){
                            if(line['optimized_investment'] > line['investment']){
                                prop = prop_up;
                            }else if(line['investment'] == line['optimized_investment']){
                                prop = prop_keep;
                            }else{
                                prop = prop_down;
                            }
                        }
                    }
                    var optimized_investment = "";
                    if(line['optimized_investment'] != null){
                        optimized_investment = line['optimized_investment'].toFixed(2);
                    }
                    var name = "collapse adwords";
                    addHtml2Investment(line, best, worst, up, roi, prop, optimized_investment, name);
                });
            }
        }
        if(investment['optimize']['facebook_lines'].length !=0){
            var general = investment['optimize']['facebook_lines']['general'];
            optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = general['optimized_investment'].toFixed(2);
            }
            if(general['best'] == null || general['worst'] == null){
                var best = "";
                if(general['best'] != null){
                    best = best_string;
                }
                var worst = "";
                if(general['worst'] != null){
                    worst = worst_string;
                }
            }
            var up = "";
            if(general['up'] == 2){
                up = up_string;
            }else if(general['up'] == 1){
                up = down_string;
            }else if(general['up'] == 0){
                up = down_string;
            }
            var prop = "";
            var roi = "";
            if(general['prop'] != null){
                roi = general['roi'].toFixed(2);
                if(general['prop_mes_anterior'] != null){
                    if(general['optimized_investment']> general['investment']){
                        prop = prop_up;
                    }else if(general['optimized_investment'] == general['investment']){
                        prop = prop_keep;
                    }else{
                        prop = prop_down;
                    }
                }
            }
            var optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = general['optimized_investment'].toFixed(2);
            }
            var identifier = "facebook";
            var dataTarget = ".facebook_ads";
            addHtmlInvestment(general, identifier, best, worst, up, dataTarget, roi, prop, optimized_investment);
            var lines = investment['optimize']['facebook_lines'][0];
            if(lines.length != 0){
                $.each(lines, function (i, line) {
                    best = "";
                    if(line['best'] != null){
                        best = best_string;
                    }
                    worst = "";
                    if(line['worst'] != null){
                        worst = worst_string;
                    }
                    var up = "";
                    if(line['up'] == 2){
                        up = up_string;
                    }else if(line['up'] == 1){
                        up = down_string;
                    }else if(line['up'] == 0){
                        up = down_string;
                    }
                    var roi = "";
                    var prop = "";
                    if(line['prop'] != null){
                        roi = line['roi'].toFixed(2);
                        if(line['prop_mes_anterior'] != null){
                            if(line['optimized_investment'] > line['investment']){
                                prop = prop_up;
                            }else if(line['investment'] == line['optimized_investment']){
                                prop = prop_keep;
                            }else{
                                prop = prop_down;
                            }
                        }
                    }
                    var optimized_investment = "";
                    if(line['optimized_investment'] != null){
                        optimized_investment = line['optimized_investment'].toFixed(2);
                    }
                    var name = "collapse facebook_ads";
                    addHtml2Investment(line, best, worst, up, roi, prop, optimized_investment, name);
                });
            }
        }

        if(investment['optimize']['twitter_lines'].length !=0){
            var general = investment['optimize']['twitter_lines']['general'];
            optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = general['optimized_investment'].toFixed(2);
            }
            if(general['best'] == null || general['worst'] == null){
                var best = "";
                if(general['best'] != null){
                    best = best_string;
                }
                var worst = "";
                if(general['worst'] != null){
                    worst = worst_string;
                }
            }
            var up = "";
            if(general['up'] == 2){
                up = up_string;
            }else if(general['up'] == 1){
                up = down_string;
            }else if(general['up'] == 0){
                up = down_string;
            }
            var prop = "";
            var roi = "";
            if(general['prop'] != null){
                roi = general['roi'].toFixed(2);
                if(general['prop_mes_anterior'] != null){
                    if(general['optimized_investment']> general['investment']){
                        prop = prop_up;
                    }else if(general['optimized_investment'] == general['investment']){
                        prop = prop_keep;
                    }else{
                        prop = prop_down;
                    }
                }
            }
            var optimized_investment = "";
            if(general['optimized_investment'] != null){
                optimized_investment = general['optimized_investment'].toFixed(2);
            }
            var identifier = "twitter";
            var dataTarget = ".twitter_ads";
            addHtmlInvestment(general, identifier, best, worst, up, dataTarget, roi, prop, optimized_investment);
            var lines = investment['optimize']['twitter_lines'][0];
            if(lines.length != 0){
                $.each(lines, function (i, line) {
                    best = "";
                    if(line['best'] != null){
                        best = best_string;
                    }
                    worst = "";
                    if(line['worst'] != null){
                        worst = worst_string;
                    }
                    var up = "";
                    if(line['up'] == 2){
                        up = up_string;
                    }else if( line['up']== 1){
                        up = down_string;
                    }else if(line['up'] == 0){
                        up = down_string;
                    }
                    roi = "";
                    var prop = "";
                    if(line['prop'] != null){
                        roi = line['roi'].toFixed(2);
                        if(line['prop_mes_anterior'] != null){
                            if(line['optimized_investment'] > line['investment']){
                                prop = prop_up;
                            }else if(line['investment'] == line['optimized_investment']){
                                prop = prop_keep;
                            }else{
                                prop = prop_down;
                            }
                        }
                    }
                    var optimized_investment = "";
                    if(line['optimized_investment'] != null){
                        optimized_investment = line['optimized_investment'].toFixed(2);
                    }
                    var name = "collapse twitter_ads";
                    addHtml2Investment(line, best, worst, up, roi, prop, optimized_investment, name);
                });
            }
        }


        for (e = 0; e < Object.keys(investment['optimize']).length-4; e++) {
            if(investment['optimize'][e].length !=0){
                var general = investment['optimize'][e]['general'];
                if(general == null){
                    general = investment['optimize'][e];
                }
                optimized_investment = "";
                if(general['optimized_investment'] != null){
                    optimized_investment = general['optimized_investment'].toFixed(2);
                }
                if(general['best'] == null || general['worst'] == null){
                    var best = "";
                    if(general['best'] != null){
                        best = best_string;
                    }
                    var worst = "";
                    if(general['worst'] != null){
                        worst = worst_string;
                    }
                }
                var up = "";
                if(general['up'] == 2){
                    up = up_string;
                }else if(general['up'] == 1){
                    up = down_string;
                }else if(general['up'] == 0){
                    up = down_string;
                }
                var prop = "";
                var roi = "";
                if(general['prop'] != null){
                    roi = general['roi'].toFixed(2);
                    if(general['prop_mes_anterior'] != null){
                        if(general['optimized_investment']> general['investment']){
                            prop = prop_up;
                        }else if(general['optimized_investment'] == general['investment']){
                            prop = prop_keep;
                        }else{
                            prop = prop_down;
                        }
                    }
                }
                var optimized_investment = "";
                if(general['optimized_investment'] != null){
                    optimized_investment = parseFloat(general['optimized_investment']).toFixed(2);
                }
                var lines = investment['optimize'][e][0];
                arrow = "";
                if(lines != null && lines.length != 0){
                    arrow = '<i class="fa fa-caret-down"></i>';
                    name = general['source'];
                }else{
                    name = general['source']+" "+general['medium']+" "+general['campaign'];
                }
                var html =
                        '<tr id = "line-'+e+'" data-toggle="collapse" data-target=".line-'+e+'" class="clickable">' +
                        '<td>'+best+worst+up+'</td>' +
                        '<td>'+name+ arrow +'</td>' +
                        '<td>'+general['transactions']+'</td>' +
                        '<td>'+parseFloat(general['revenue']).toFixed(2)+'</td>' +
                        '<td>'+parseFloat(general['investment']).toFixed(2)+'</td>' +
                        // '<td>'+parseFloat(general['transactions_costs']).toFixed(2)+'</td>' +
                        '<td class="externalCostsTd">'+parseFloat(general['external_costs']).toFixed(2)+'</td>' +
                        '<td>'+parseFloat(general['profits']).toFixed(2)+'</td>' +
                        '<td>'+roi+'</td>' +
                        '<td class="advice">'+prop+'</td>' +
                        '<td class="advice">'+optimized_investment+'</td>' +
                        '</tr>'
                $('.compassuite-investment-table').append(html);
                if(lines != null && lines.length != 0){
                    $.each(lines, function (i, line) {
                        best = "";
                        if(line['best'] != null){
                            best = best_string;
                        }
                        worst = "";
                        if(line['worst'] != null){
                            worst = worst_string;
                        }
                        var up = "";
                        if(line['up'] == 2){
                            up = up_string;
                        }else if( line['up']== 1){
                            up = down_string;
                        }else if(line['up'] == 0){
                            up = down_string;
                        }
                        roi = "";
                        var prop = "";
                        if(line['prop'] != null){
                            roi = line['roi'].toFixed(2);
                            if(line['prop_mes_anterior'] != null){
                                if(line['optimized_investment'] > line['investment']){
                                    prop = prop_up;
                                }else if(line['investment'] == line['optimized_investment']){
                                    prop = prop_keep;
                                }else{
                                    prop = prop_down;
                                }
                            }
                        }
                        var optimized_investment = "";
                        if(general['optimized_investment'] != null){
                            optimized_investment = general['optimized_investment'].toFixed(2);
                        }
                        var html2 =
                                '<tr class="collapse line-'+e+'">' +
                                '<td>'+best+worst+up+'</td>' +
                                '<td class="hiddenRow"><div class="collapse line-'+e+'">'+line['source']+'</div></td>' +
                                '<td class="hiddenRow"><div class="collapse line-'+e+'">'+line['transactions']+'</div></td>' +
                                '<td class="hiddenRow"><div class="collapse line-'+e+'">'+parseFloat(line['revenue']).toFixed(2)+'</div></td>' +
                                '<td class="hiddenRow"><div class="collapse line-'+e+'">'+parseFloat(line['investment']).toFixed(2)+'</div></td>' +
                                // '<td class="hiddenRow"><div class="collapse line-'+e+'">'+parseFloat(line['transactions_costs']).toFixed(2)+'</div>' +
                                '<td class="hiddenRow externalCosts"><div class="collapse line-'+e+'"> </div></td>' +
                                '<td class="hiddenRow"><div class="collapse line-'+e+'">'+parseFloat(line['profits']).toFixed(2)+'</div></td>' +
                                '<td class="hiddenRow"><div class="collapse line-'+e+'">'+roi+'</div></td>' +
                                '<td class="hiddenRow"><div class="collapse line-'+e+'">'+prop+'</div>' +
                                '</td><td class="hiddenRow"><div class="collapse line-'+e+'">'+optimized_investment+'</div>' +
                                '</tr>';
                        $('.compassuite-investment-table').append(html2);
                    });
                }
            }
        }
        var valueProperty = $('#uniform-externalCostsCheck-id').children().hasClass('checked');
        if(valueProperty){
            $('.externalCostsTd').fadeIn();
            $('.externalCosts').fadeIn();
            $('#externalCostTh').fadeIn();
            $('#costesThId').attr('colspan',3);
        }else{
            $('.externalCostsTd').fadeOut();
            $('.externalCosts').fadeOut();
            $('#externalCostTh').fadeOut();
            $('#costesThId').attr('colspan',2);
        }
        $('[data-toggle="tooltip"]').tooltip();
    }

    function addHtmlInvestment(general, identifier, best, worst, up, dataTarget,roi, prop, optimized_investment){
        var html =
            '<tr id = "'+identifier+'" data-toggle="collapse" data-target="'+dataTarget+'" class="clickable">' +
            '<td>'+best+worst+up+'</td>' +
            '<td>'+general['source']+'<i class="fa fa-caret-down"></i>' +'</td>' +
            '<td>'+general['transactions']+'</td><td>'+general['revenue'].toFixed(2)+'</td>' +
            '<td>'+general['investment'].toFixed(2)+'</td>' +
            // '<td>'+general['transactions_costs'].toFixed(2)+'</td>' +
            '<td class="externalCostsTd">'+general['external_costs'].toFixed(2)+'</td>' +
            '<td>'+general['profits'].toFixed(2)+'</td>' +
            '<td>'+roi+'</td>' +
            '<td class="advice">'+prop+'</td>' +
            '<td class="advice">'+optimized_investment+'</td>' +
            '</tr>';
        $('.compassuite-investment-table').append(html);
    }
    function addHtml2Investment(line, best, worst, up, roi, prop, optimized_investment, name){
        var definition = line['source'];
        if(line['campaign'] != null){
            definition = line['campaign'];
        }else if(line['campaign_name']!= null){
            definition = line['campaign_name'];
        }
        if(campaigns[definition] != null && campaigns[definition] != undefined){
            definition = campaigns[definition]
        }
        var html2 =
            '<tr class="'+name+'">' +
            '<td>'+best+worst+up+'</td>' +
            '<td class="hiddenRow"><div class="'+name+'">'+definition+'</div></td>' +
            '<td class="hiddenRow"><div class="'+name+'">'+line['transactions']+'</div></td>' +
            '<td class="hiddenRow"><div class="'+name+'">'+parseFloat(line['revenue']).toFixed(2)+'</div></td>' +
            '<td class="hiddenRow"><div class="'+name+'">'+parseFloat(line['investment']).toFixed(2)+'</div></td>' +
            // '<td class="hiddenRow"><div class="'+name+'">'+parseFloat(line['transactions_costs']).toFixed(2)+'</div>' +
            '<td class="hiddenRow externalCosts"><div class="'+name+'"> </div></td>' +
            '<td class="hiddenRow"><div class="'+name+'">'+parseFloat(line['profits']).toFixed(2)+'</div></td>' +
            '<td class="hiddenRow"><div class="'+name+'">'+roi+'</div></td>' +
            '<td class="hiddenRow"><div class="'+name+'">'+prop+'</div>' +
            '</td><td class="hiddenRow"><div class="'+name+'">'+optimized_investment+'</div>' +
            '</tr>';
        $('.compassuite-investment-table').append(html2);

    }


