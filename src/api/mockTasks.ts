import { TaskStatus, TaskResponse } from '@/types';

export async function rawDataToResponse (list: RawTask[]): Promise<TaskResponse> {
    const addedTasks: string[] = [];
    const addedUsers: string[] = [];
    const addedCompanies: string[] = [];

    await new Promise((res) => {
        setTimeout(res, 1000);
    });

    return list.reduce((acc, { 
        task_owner,
        email,
        company_name,
        task_date,
        task_description,
        task_status, }
    ) => {
        if (!addedCompanies.includes(company_name)) {
            addedCompanies.push(company_name);
            acc.companies.push({
                companyId: company_name,
                name: company_name
            });
        }
        if (!addedUsers.includes(task_owner)) {
            addedUsers.push(task_owner);
            acc.users.push({
                userId: task_owner,
                name: task_owner,
                companyId: company_name,
                email
            });
        }
        if (!addedTasks.includes(task_description)) {
            addedTasks.push(task_description);
            acc.tasks.push({
                taskId: task_description,
                description: task_description,
                createdByUserId: task_owner,
                date: task_date,
                status: task_status
            });
        }

        return acc;
    }, {
        tasks: [],
        users: [],
        companies: []
    } as TaskResponse);
}


export type RawTask = {
  task_owner: string,
  email: string,
  company_name: string,
  task_date: string,
  task_description: string,
  task_status: TaskStatus
}

const mockData = [
    {
        'task_owner': 'Carson Landman',
        'email': 'clandman0@cyberchimps.com',
        'company_name': 'Roodel',
        'task_date': '2022-07-17',
        'task_description': 'lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sigfried Cusick',
        'email': 'scusick1@bravesites.com',
        'company_name': 'Fadeo',
        'task_date': '2022-09-05',
        'task_description': 'non quam nec dui luctus rutrum nulla tellus in sagittis dui vel',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Anthiathia Hanwell',
        'email': 'ahanwell2@eventbrite.com',
        'company_name': 'Mybuzz',
        'task_date': '2022-05-06',
        'task_description': 'ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Leroi Olanda',
        'email': 'lolanda3@uiuc.edu',
        'company_name': 'Wordtune',
        'task_date': '2022-09-04',
        'task_description': 'eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Blayne Spinke',
        'email': 'bspinke4@abc.net.au',
        'company_name': 'Skinder',
        'task_date': '2022-01-24',
        'task_description': 'mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Selene Jeannot',
        'email': 'sjeannot5@purevolume.com',
        'company_name': 'Trupe',
        'task_date': '2022-09-19',
        'task_description': 'lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lucila Hare',
        'email': 'lhare6@tripod.com',
        'company_name': 'Feedmix',
        'task_date': '2022-10-20',
        'task_description': 'ante ipsum primis in faucibus orci luctus et ultrices posuere',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Marilyn Scotney',
        'email': 'mscotney7@studiopress.com',
        'company_name': 'Flashspan',
        'task_date': '2022-08-01',
        'task_description': 'rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Eryn Brandes',
        'email': 'ebrandes8@timesonline.co.uk',
        'company_name': 'Oyoyo',
        'task_date': '2022-09-19',
        'task_description': 'ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Laetitia Valentino',
        'email': 'lvalentino9@xrea.com',
        'company_name': 'Shufflester',
        'task_date': '2022-04-06',
        'task_description': 'tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Fidole Nekrews',
        'email': 'fnekrewsa@infoseek.co.jp',
        'company_name': 'Skyvu',
        'task_date': '2022-07-07',
        'task_description': 'sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jeremy Birtchnell',
        'email': 'jbirtchnellb@wp.com',
        'company_name': 'Devcast',
        'task_date': '2022-01-11',
        'task_description': 'purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Matthieu Thowless',
        'email': 'mthowlessc@photobucket.com',
        'company_name': 'Devify',
        'task_date': '2022-08-30',
        'task_description': 'vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lambert Kirkam',
        'email': 'lkirkamd@deliciousdays.com',
        'company_name': 'Minyx',
        'task_date': '2022-08-18',
        'task_description': 'ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Barby Calkin',
        'email': 'bcalkine@unblog.fr',
        'company_name': 'Eire',
        'task_date': '2022-09-08',
        'task_description': 'condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Norrie Skaid',
        'email': 'nskaidf@multiply.com',
        'company_name': 'Yotz',
        'task_date': '2022-10-29',
        'task_description': 'turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Alexina Pruckner',
        'email': 'aprucknerg@shutterfly.com',
        'company_name': 'Meevee',
        'task_date': '2022-03-21',
        'task_description': 'est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Nancy Basillon',
        'email': 'nbasillonh@hao123.com',
        'company_name': 'Skimia',
        'task_date': '2022-07-05',
        'task_description': 'habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sidonia Murname',
        'email': 'smurnamei@taobao.com',
        'company_name': 'Realbuzz',
        'task_date': '2022-07-23',
        'task_description': 'pede venenatis non sodales sed tincidunt eu felis fusce posuere',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ileane Petegree',
        'email': 'ipetegreej@people.com.cn',
        'company_name': 'Wordpedia',
        'task_date': '2022-05-15',
        'task_description': 'rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rora Welbourn',
        'email': 'rwelbournk@mlb.com',
        'company_name': 'Realblab',
        'task_date': '2022-08-10',
        'task_description': 'morbi non lectus aliquam sit amet diam in magna bibendum imperdiet',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sayer Gallichan',
        'email': 'sgallichanl@tinypic.com',
        'company_name': 'Twiyo',
        'task_date': '2022-10-21',
        'task_description': 'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Geno Bruton',
        'email': 'gbrutonm@craigslist.org',
        'company_name': 'Kwilith',
        'task_date': '2022-04-24',
        'task_description': 'leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Dora Congrave',
        'email': 'dcongraven@netlog.com',
        'company_name': 'Kimia',
        'task_date': '2022-08-10',
        'task_description': 'lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Clemens Chinge',
        'email': 'cchingeo@goo.ne.jp',
        'company_name': 'Twimm',
        'task_date': '2022-08-05',
        'task_description': 'quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lara Eggins',
        'email': 'legginsp@boston.com',
        'company_name': 'Skiptube',
        'task_date': '2021-12-06',
        'task_description': 'pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Haskel Bannard',
        'email': 'hbannardq@washingtonpost.com',
        'company_name': 'Yadel',
        'task_date': '2022-03-09',
        'task_description': 'ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sheree Toomey',
        'email': 'stoomeyr@house.gov',
        'company_name': 'Youtags',
        'task_date': '2022-08-27',
        'task_description': 'augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Adeline Tomaszewicz',
        'email': 'atomaszewiczs@webs.com',
        'company_name': 'Oloo',
        'task_date': '2022-05-04',
        'task_description': 'metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Margeaux Ramsell',
        'email': 'mramsellt@wikia.com',
        'company_name': 'Tavu',
        'task_date': '2022-03-22',
        'task_description': 'mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Georgetta Waring',
        'email': 'gwaringu@fema.gov',
        'company_name': 'Topdrive',
        'task_date': '2022-02-12',
        'task_description': 'egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dewey Phelps',
        'email': 'dphelpsv@google.es',
        'company_name': 'Flashpoint',
        'task_date': '2022-06-03',
        'task_description': 'tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Garvy Smitheman',
        'email': 'gsmithemanw@cafepress.com',
        'company_name': 'Oozz',
        'task_date': '2022-04-28',
        'task_description': 'sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Codi Jehan',
        'email': 'cjehanx@barnesandnoble.com',
        'company_name': 'Oodoo',
        'task_date': '2022-06-19',
        'task_description': 'vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Innis Piris',
        'email': 'ipirisy@uol.com.br',
        'company_name': 'Demimbu',
        'task_date': '2021-12-18',
        'task_description': 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Blakelee Garn',
        'email': 'bgarnz@xing.com',
        'company_name': 'Teklist',
        'task_date': '2022-10-22',
        'task_description': 'venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Torin Hatchette',
        'email': 'thatchette10@seattletimes.com',
        'company_name': 'Shuffletag',
        'task_date': '2022-02-09',
        'task_description': 'aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Etti Dumphy',
        'email': 'edumphy11@independent.co.uk',
        'company_name': 'Quamba',
        'task_date': '2022-04-30',
        'task_description': 'vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Freddy Summerrell',
        'email': 'fsummerrell12@webeden.co.uk',
        'company_name': 'Demizz',
        'task_date': '2022-06-13',
        'task_description': 'ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cammy Callen',
        'email': 'ccallen13@howstuffworks.com',
        'company_name': 'Trudeo',
        'task_date': '2022-01-08',
        'task_description': 'ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Barnie Rawdall',
        'email': 'brawdall14@uiuc.edu',
        'company_name': 'Yadel',
        'task_date': '2022-06-21',
        'task_description': 'lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Joice Josovitz',
        'email': 'jjosovitz15@xinhuanet.com',
        'company_name': 'Photobean',
        'task_date': '2021-11-14',
        'task_description': 'suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Arlena Whetland',
        'email': 'awhetland16@cnn.com',
        'company_name': 'Divavu',
        'task_date': '2022-03-09',
        'task_description': 'sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Denny Cochet',
        'email': 'dcochet17@google.es',
        'company_name': 'Youtags',
        'task_date': '2022-11-02',
        'task_description': 'ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Aidan Ambrozewicz',
        'email': 'aambrozewicz18@technorati.com',
        'company_name': 'Kare',
        'task_date': '2022-06-14',
        'task_description': 'condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Dall Sarra',
        'email': 'dsarra19@livejournal.com',
        'company_name': 'Trudoo',
        'task_date': '2022-08-28',
        'task_description': 'maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lewiss Montague',
        'email': 'lmontague1a@edublogs.org',
        'company_name': 'Edgewire',
        'task_date': '2022-01-23',
        'task_description': 'velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Aggie Stockford',
        'email': 'astockford1b@umich.edu',
        'company_name': 'Tazzy',
        'task_date': '2021-12-04',
        'task_description': 'maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Marten Carren',
        'email': 'mcarren1c@theguardian.com',
        'company_name': 'Twimbo',
        'task_date': '2021-11-24',
        'task_description': 'sit amet lobortis sapien sapien non mi integer ac neque duis bibendum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Dasi Gauford',
        'email': 'dgauford1d@arizona.edu',
        'company_name': 'Tagtune',
        'task_date': '2022-07-06',
        'task_description': 'risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Georgeanna Balharry',
        'email': 'gbalharry1e@ezinearticles.com',
        'company_name': 'Tagtune',
        'task_date': '2022-03-07',
        'task_description': 'mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Christie Lambarton',
        'email': 'clambarton1f@weibo.com',
        'company_name': 'Twitterworks',
        'task_date': '2022-05-19',
        'task_description': 'accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Hunter Henriet',
        'email': 'hhenriet1g@nps.gov',
        'company_name': 'Tagpad',
        'task_date': '2022-04-08',
        'task_description': 'amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Templeton Viger',
        'email': 'tviger1h@123-reg.co.uk',
        'company_name': 'Wikizz',
        'task_date': '2022-08-24',
        'task_description': 'in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Cosme Sesons',
        'email': 'csesons1i@yahoo.co.jp',
        'company_name': 'Realblab',
        'task_date': '2022-05-16',
        'task_description': 'sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Tarrance Fery',
        'email': 'tfery1j@bbb.org',
        'company_name': 'Cogibox',
        'task_date': '2022-03-20',
        'task_description': 'elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Stephie Cheley',
        'email': 'scheley1k@seesaa.net',
        'company_name': 'Gigashots',
        'task_date': '2022-03-01',
        'task_description': 'lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Elva Short',
        'email': 'eshort1l@constantcontact.com',
        'company_name': 'Skipstorm',
        'task_date': '2022-06-13',
        'task_description': 'in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Shanan Loos',
        'email': 'sloos1m@howstuffworks.com',
        'company_name': 'Dabfeed',
        'task_date': '2022-06-14',
        'task_description': 'amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Elva Marrows',
        'email': 'emarrows1n@squarespace.com',
        'company_name': 'Dabshots',
        'task_date': '2022-06-09',
        'task_description': 'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Brianne Newbury',
        'email': 'bnewbury1o@redcross.org',
        'company_name': 'Wikizz',
        'task_date': '2022-07-22',
        'task_description': 'molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Calli Haggard',
        'email': 'chaggard1p@omniture.com',
        'company_name': 'Skimia',
        'task_date': '2022-03-03',
        'task_description': 'convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Adlai Strangeway',
        'email': 'astrangeway1q@jiathis.com',
        'company_name': 'Mita',
        'task_date': '2021-12-30',
        'task_description': 'condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Case Murden',
        'email': 'cmurden1r@ucoz.ru',
        'company_name': 'Talane',
        'task_date': '2022-06-23',
        'task_description': 'amet turpis elementum ligula vehicula consequat morbi a ipsum integer',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Garik Slad',
        'email': 'gslad1s@google.it',
        'company_name': 'Viva',
        'task_date': '2022-01-22',
        'task_description': 'nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Konstance Cartmale',
        'email': 'kcartmale1t@yellowpages.com',
        'company_name': 'Thoughtblab',
        'task_date': '2022-04-13',
        'task_description': 'dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Fey Lochet',
        'email': 'flochet1u@hatena.ne.jp',
        'company_name': 'Yoveo',
        'task_date': '2022-01-07',
        'task_description': 'mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Katha Whitesel',
        'email': 'kwhitesel1v@timesonline.co.uk',
        'company_name': 'Feedbug',
        'task_date': '2022-01-27',
        'task_description': 'feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Hadlee Sellen',
        'email': 'hsellen1w@printfriendly.com',
        'company_name': 'Skyndu',
        'task_date': '2021-12-30',
        'task_description': 'ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Horatio Vell',
        'email': 'hvell1x@smugmug.com',
        'company_name': 'Gigaclub',
        'task_date': '2022-03-31',
        'task_description': 'tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Clementius Dearle',
        'email': 'cdearle1y@java.com',
        'company_name': 'Skyndu',
        'task_date': '2022-04-16',
        'task_description': 'curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Claus Harkin',
        'email': 'charkin1z@uiuc.edu',
        'company_name': 'Kayveo',
        'task_date': '2021-11-18',
        'task_description': 'amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Andy Evamy',
        'email': 'aevamy20@studiopress.com',
        'company_name': 'Jaxbean',
        'task_date': '2022-08-24',
        'task_description': 'posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Harriette Esh',
        'email': 'hesh21@hc360.com',
        'company_name': 'Youfeed',
        'task_date': '2022-11-02',
        'task_description': 'curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ferd Bigmore',
        'email': 'fbigmore22@amazon.co.uk',
        'company_name': 'Dynazzy',
        'task_date': '2022-09-20',
        'task_description': 'condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Filide Leythley',
        'email': 'fleythley23@seesaa.net',
        'company_name': 'Bluejam',
        'task_date': '2022-08-10',
        'task_description': 'donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Timmi Batho',
        'email': 'tbatho24@spiegel.de',
        'company_name': 'Viva',
        'task_date': '2022-05-11',
        'task_description': 'at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Case Grestye',
        'email': 'cgrestye25@a8.net',
        'company_name': 'Dynazzy',
        'task_date': '2022-02-21',
        'task_description': 'volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Borg Sherbrooke',
        'email': 'bsherbrooke26@engadget.com',
        'company_name': 'Plajo',
        'task_date': '2021-12-30',
        'task_description': 'vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Vanny Idle',
        'email': 'vidle27@mapy.cz',
        'company_name': 'Skyble',
        'task_date': '2022-06-11',
        'task_description': 'convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Emlyn Wroe',
        'email': 'ewroe28@who.int',
        'company_name': 'Tekfly',
        'task_date': '2021-12-19',
        'task_description': 'lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Morgen Terrazzo',
        'email': 'mterrazzo29@wired.com',
        'company_name': 'Jaxworks',
        'task_date': '2022-06-01',
        'task_description': 'id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jehanna Trowill',
        'email': 'jtrowill2a@reuters.com',
        'company_name': 'Dynava',
        'task_date': '2022-06-30',
        'task_description': 'odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dalston Armatidge',
        'email': 'darmatidge2b@taobao.com',
        'company_name': 'Youtags',
        'task_date': '2022-04-25',
        'task_description': 'et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Vaclav McMeanma',
        'email': 'vmcmeanma2c@sphinn.com',
        'company_name': 'Cogilith',
        'task_date': '2022-10-16',
        'task_description': 'non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Almeta Maier',
        'email': 'amaier2d@home.pl',
        'company_name': 'Feednation',
        'task_date': '2022-01-16',
        'task_description': 'a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Filip Huntingdon',
        'email': 'fhuntingdon2e@xrea.com',
        'company_name': 'Roodel',
        'task_date': '2022-02-22',
        'task_description': 'libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kerk Charlet',
        'email': 'kcharlet2f@blogspot.com',
        'company_name': 'Buzzster',
        'task_date': '2022-08-16',
        'task_description': 'natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Rolando Girardetti',
        'email': 'rgirardetti2g@microsoft.com',
        'company_name': 'Wordpedia',
        'task_date': '2022-10-06',
        'task_description': 'at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Loreen Kelloch',
        'email': 'lkelloch2h@t-online.de',
        'company_name': 'Zoonoodle',
        'task_date': '2022-08-22',
        'task_description': 'ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Valentia Kippen',
        'email': 'vkippen2i@networkadvertising.org',
        'company_name': 'Twitterworks',
        'task_date': '2022-05-31',
        'task_description': 'dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kathryn Yekel',
        'email': 'kyekel2j@microsoft.com',
        'company_name': 'Browsebug',
        'task_date': '2022-09-16',
        'task_description': 'gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Olvan Nelsey',
        'email': 'onelsey2k@123-reg.co.uk',
        'company_name': 'Skyndu',
        'task_date': '2021-12-03',
        'task_description': 'duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Bo Ledgard',
        'email': 'bledgard2l@vk.com',
        'company_name': 'Feedmix',
        'task_date': '2022-07-08',
        'task_description': 'velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Cortie Boshard',
        'email': 'cboshard2m@instagram.com',
        'company_name': 'Shufflester',
        'task_date': '2022-11-10',
        'task_description': 'ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Tricia Attard',
        'email': 'tattard2n@prlog.org',
        'company_name': 'Thoughtworks',
        'task_date': '2022-03-18',
        'task_description': 'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Olly Eckersall',
        'email': 'oeckersall2o@pagesperso-orange.fr',
        'company_name': 'Rhynoodle',
        'task_date': '2022-03-08',
        'task_description': 'arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Marcellina Drance',
        'email': 'mdrance2p@joomla.org',
        'company_name': 'Shufflester',
        'task_date': '2022-06-09',
        'task_description': 'vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Von Summerly',
        'email': 'vsummerly2q@dmoz.org',
        'company_name': 'Yakidoo',
        'task_date': '2022-06-03',
        'task_description': 'blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lidia Soal',
        'email': 'lsoal2r@aboutads.info',
        'company_name': 'Tazz',
        'task_date': '2022-10-30',
        'task_description': 'tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sissie Boays',
        'email': 'sboays2s@comsenz.com',
        'company_name': 'Tekfly',
        'task_date': '2022-07-31',
        'task_description': 'ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Meridel Foran',
        'email': 'mforan2t@infoseek.co.jp',
        'company_name': 'Twimm',
        'task_date': '2022-09-02',
        'task_description': 'id pretium iaculis diam erat fermentum justo nec condimentum neque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Judith Bascomb',
        'email': 'jbascomb2u@icio.us',
        'company_name': 'Innojam',
        'task_date': '2022-09-24',
        'task_description': 'elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ivett Tompsett',
        'email': 'itompsett2v@smugmug.com',
        'company_name': 'Browseblab',
        'task_date': '2022-04-10',
        'task_description': 'habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Flynn Charte',
        'email': 'fcharte2w@hibu.com',
        'company_name': 'Tagopia',
        'task_date': '2022-05-08',
        'task_description': 'imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Eduino Drew-Clifton',
        'email': 'edrewclifton2x@noaa.gov',
        'company_name': 'Gabtype',
        'task_date': '2022-03-29',
        'task_description': 'velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Johnath Bowerman',
        'email': 'jbowerman2y@soup.io',
        'company_name': 'Twitterbridge',
        'task_date': '2022-05-13',
        'task_description': 'morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Grayce Reece',
        'email': 'greece2z@xinhuanet.com',
        'company_name': 'Trudoo',
        'task_date': '2022-06-07',
        'task_description': 'imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rois Milverton',
        'email': 'rmilverton30@feedburner.com',
        'company_name': 'Aibox',
        'task_date': '2021-12-18',
        'task_description': 'posuere metus vitae ipsum aliquam non mauris morbi non lectus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Woodrow Vine',
        'email': 'wvine31@163.com',
        'company_name': 'Yakijo',
        'task_date': '2022-08-23',
        'task_description': 'eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Owen Rudland',
        'email': 'orudland32@cocolog-nifty.com',
        'company_name': 'Dabjam',
        'task_date': '2021-12-20',
        'task_description': 'pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cleavland Kennham',
        'email': 'ckennham33@squarespace.com',
        'company_name': 'Fiveclub',
        'task_date': '2022-01-25',
        'task_description': 'dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kinsley Soame',
        'email': 'ksoame34@miibeian.gov.cn',
        'company_name': 'BlogXS',
        'task_date': '2022-04-28',
        'task_description': 'cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Vincent Fulbrook',
        'email': 'vfulbrook35@mac.com',
        'company_name': 'Jazzy',
        'task_date': '2022-04-24',
        'task_description': 'augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kathe Padden',
        'email': 'kpadden36@ucsd.edu',
        'company_name': 'Muxo',
        'task_date': '2022-10-17',
        'task_description': 'integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bryant Rochester',
        'email': 'brochester37@va.gov',
        'company_name': 'Livetube',
        'task_date': '2022-01-04',
        'task_description': 'cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Raf McGeffen',
        'email': 'rmcgeffen38@blinklist.com',
        'company_name': 'Demimbu',
        'task_date': '2022-10-28',
        'task_description': 'in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Bradley Deverose',
        'email': 'bdeverose39@howstuffworks.com',
        'company_name': 'Yabox',
        'task_date': '2021-11-27',
        'task_description': 'tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ferdy Brannigan',
        'email': 'fbrannigan3a@twitpic.com',
        'company_name': 'Twitterbridge',
        'task_date': '2022-02-07',
        'task_description': 'duis faucibus accumsan odio curabitur convallis duis consequat dui nec',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nani Conford',
        'email': 'nconford3b@theglobeandmail.com',
        'company_name': 'Dynabox',
        'task_date': '2021-12-29',
        'task_description': 'orci eget orci vehicula condimentum curabitur in libero ut massa volutpat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Salem Bartholin',
        'email': 'sbartholin3c@cnbc.com',
        'company_name': 'Ailane',
        'task_date': '2022-09-10',
        'task_description': 'quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Karina Millis',
        'email': 'kmillis3d@drupal.org',
        'company_name': 'Vinder',
        'task_date': '2022-09-07',
        'task_description': 'suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Francyne Borel',
        'email': 'fborel3e@rambler.ru',
        'company_name': 'Zooxo',
        'task_date': '2022-04-30',
        'task_description': 'in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Miranda Baldelli',
        'email': 'mbaldelli3f@stanford.edu',
        'company_name': 'Brightbean',
        'task_date': '2022-06-26',
        'task_description': 'quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Will Killingback',
        'email': 'wkillingback3g@patch.com',
        'company_name': 'Kimia',
        'task_date': '2022-08-27',
        'task_description': 'purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Genevieve Lulham',
        'email': 'glulham3h@symantec.com',
        'company_name': 'Flashpoint',
        'task_date': '2022-06-16',
        'task_description': 'eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Arlyne Fletcher',
        'email': 'afletcher3i@imageshack.us',
        'company_name': 'Zoonder',
        'task_date': '2022-05-16',
        'task_description': 'suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Clint Blazewicz',
        'email': 'cblazewicz3j@sfgate.com',
        'company_name': 'Linklinks',
        'task_date': '2022-01-09',
        'task_description': 'consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sisely Mew',
        'email': 'smew3k@ucsd.edu',
        'company_name': 'Skimia',
        'task_date': '2022-10-01',
        'task_description': 'sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Waneta Gable',
        'email': 'wgable3l@paginegialle.it',
        'company_name': 'Voomm',
        'task_date': '2022-08-19',
        'task_description': 'tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Tybalt Timcke',
        'email': 'ttimcke3m@webs.com',
        'company_name': 'Skajo',
        'task_date': '2022-04-30',
        'task_description': 'convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Raine Aarons',
        'email': 'raarons3n@naver.com',
        'company_name': 'Skinix',
        'task_date': '2022-06-25',
        'task_description': 'tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Stacy Sherborne',
        'email': 'ssherborne3o@skyrock.com',
        'company_name': 'Photospace',
        'task_date': '2022-10-20',
        'task_description': 'nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Gayle Calwell',
        'email': 'gcalwell3p@msu.edu',
        'company_name': 'Gigashots',
        'task_date': '2022-09-04',
        'task_description': 'congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sabina Gavan',
        'email': 'sgavan3q@elpais.com',
        'company_name': 'Cogilith',
        'task_date': '2022-04-29',
        'task_description': 'quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Adelheid Cadigan',
        'email': 'acadigan3r@youtu.be',
        'company_name': 'Babbleset',
        'task_date': '2022-01-06',
        'task_description': 'turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Helli Bacon',
        'email': 'hbacon3s@eventbrite.com',
        'company_name': 'Wikibox',
        'task_date': '2022-09-13',
        'task_description': 'in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'El Easum',
        'email': 'eeasum3t@cargocollective.com',
        'company_name': 'Fanoodle',
        'task_date': '2022-11-05',
        'task_description': 'ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hollie Bartrum',
        'email': 'hbartrum3u@google.pl',
        'company_name': 'Edgeclub',
        'task_date': '2021-12-02',
        'task_description': 'accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Arty Nucci',
        'email': 'anucci3v@theguardian.com',
        'company_name': 'Browsetype',
        'task_date': '2022-10-13',
        'task_description': 'eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Egon Tough',
        'email': 'etough3w@hao123.com',
        'company_name': 'JumpXS',
        'task_date': '2022-01-26',
        'task_description': 'congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Feliks Brimmell',
        'email': 'fbrimmell3x@goodreads.com',
        'company_name': 'Quinu',
        'task_date': '2022-10-24',
        'task_description': 'sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jeffie Lathleiffure',
        'email': 'jlathleiffure3y@instagram.com',
        'company_name': 'Twimm',
        'task_date': '2021-11-15',
        'task_description': 'suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ricki Sibyllina',
        'email': 'rsibyllina3z@globo.com',
        'company_name': 'Omba',
        'task_date': '2022-03-11',
        'task_description': 'a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Vaughan Hamper',
        'email': 'vhamper40@storify.com',
        'company_name': 'Browsebug',
        'task_date': '2021-12-02',
        'task_description': 'ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Elle Braim',
        'email': 'ebraim41@nyu.edu',
        'company_name': 'Devshare',
        'task_date': '2022-08-31',
        'task_description': 'tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Wendel Bauduin',
        'email': 'wbauduin42@hao123.com',
        'company_name': 'Podcat',
        'task_date': '2022-01-11',
        'task_description': 'id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Morse Wakefield',
        'email': 'mwakefield43@lulu.com',
        'company_name': 'Kwideo',
        'task_date': '2021-12-14',
        'task_description': 'et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Aldrich Gisbey',
        'email': 'agisbey44@bizjournals.com',
        'company_name': 'Jayo',
        'task_date': '2022-06-06',
        'task_description': 'eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Clotilda Winsley',
        'email': 'cwinsley45@amazon.co.jp',
        'company_name': 'Roombo',
        'task_date': '2022-08-15',
        'task_description': 'ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Valeria Benterman',
        'email': 'vbenterman46@unesco.org',
        'company_name': 'Kazu',
        'task_date': '2022-01-08',
        'task_description': 'iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sidney Hardie',
        'email': 'shardie47@boston.com',
        'company_name': 'Rhynoodle',
        'task_date': '2022-03-31',
        'task_description': 'platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Thoma Cranch',
        'email': 'tcranch48@seattletimes.com',
        'company_name': 'Rooxo',
        'task_date': '2022-04-30',
        'task_description': 'in magna bibendum imperdiet nullam orci pede venenatis non sodales',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ardath Paniman',
        'email': 'apaniman49@webeden.co.uk',
        'company_name': 'Eimbee',
        'task_date': '2022-07-03',
        'task_description': 'tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dennison Climson',
        'email': 'dclimson4a@t.co',
        'company_name': 'Twitterbeat',
        'task_date': '2022-08-15',
        'task_description': 'cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Shae Chaves',
        'email': 'schaves4b@reference.com',
        'company_name': 'Photojam',
        'task_date': '2021-11-20',
        'task_description': 'laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ario Vanderplas',
        'email': 'avanderplas4c@theguardian.com',
        'company_name': 'Flipopia',
        'task_date': '2022-03-06',
        'task_description': 'blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jillana Macvain',
        'email': 'jmacvain4d@wisc.edu',
        'company_name': 'Eayo',
        'task_date': '2022-11-01',
        'task_description': 'lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Tomlin Enston',
        'email': 'tenston4e@ehow.com',
        'company_name': 'Oyondu',
        'task_date': '2022-06-17',
        'task_description': 'augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Viole McDade',
        'email': 'vmcdade4f@house.gov',
        'company_name': 'Fivespan',
        'task_date': '2021-12-14',
        'task_description': 'faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Carmelle Hugle',
        'email': 'chugle4g@nba.com',
        'company_name': 'JumpXS',
        'task_date': '2022-03-21',
        'task_description': 'maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Devinne Aldersley',
        'email': 'daldersley4h@accuweather.com',
        'company_name': 'Zoombeat',
        'task_date': '2022-05-15',
        'task_description': 'interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Valerie Whelpdale',
        'email': 'vwhelpdale4i@foxnews.com',
        'company_name': 'Bubblebox',
        'task_date': '2022-02-11',
        'task_description': 'morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Zsa zsa Negro',
        'email': 'zzsa4j@friendfeed.com',
        'company_name': 'Topicshots',
        'task_date': '2022-03-15',
        'task_description': 'rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Norene Peller',
        'email': 'npeller4k@sun.com',
        'company_name': 'Kwinu',
        'task_date': '2022-06-30',
        'task_description': 'vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dewie Eddis',
        'email': 'deddis4l@yelp.com',
        'company_name': 'Avamm',
        'task_date': '2022-10-24',
        'task_description': 'scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jerrie Garric',
        'email': 'jgarric4m@homestead.com',
        'company_name': 'Kamba',
        'task_date': '2022-01-11',
        'task_description': 'interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Shayna Dulin',
        'email': 'sdulin4n@abc.net.au',
        'company_name': 'Tagopia',
        'task_date': '2022-02-14',
        'task_description': 'dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cart Skea',
        'email': 'cskea4o@bloglines.com',
        'company_name': 'Babblestorm',
        'task_date': '2022-04-13',
        'task_description': 'elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lamont Otter',
        'email': 'lotter4p@go.com',
        'company_name': 'Browsebug',
        'task_date': '2021-11-23',
        'task_description': 'sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hallsy Ludvigsen',
        'email': 'hludvigsen4q@microsoft.com',
        'company_name': 'Fadeo',
        'task_date': '2022-10-27',
        'task_description': 'morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Louisa Corkill',
        'email': 'lcorkill4r@fema.gov',
        'company_name': 'Vitz',
        'task_date': '2022-04-11',
        'task_description': 'sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Adina Sommerlin',
        'email': 'asommerlin4s@scientificamerican.com',
        'company_name': 'Reallinks',
        'task_date': '2022-04-30',
        'task_description': 'sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Holli Keig',
        'email': 'hkeig4t@paginegialle.it',
        'company_name': 'Realbridge',
        'task_date': '2022-10-20',
        'task_description': 'quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Brittany Clarabut',
        'email': 'bclarabut4u@ibm.com',
        'company_name': 'Quimba',
        'task_date': '2022-03-15',
        'task_description': 'quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sarajane Hazeman',
        'email': 'shazeman4v@auda.org.au',
        'company_name': 'Innojam',
        'task_date': '2021-12-20',
        'task_description': 'praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Keriann Mapston',
        'email': 'kmapston4w@dion.ne.jp',
        'company_name': 'Roomm',
        'task_date': '2022-07-21',
        'task_description': 'lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Mattie Bretherick',
        'email': 'mbretherick4x@google.cn',
        'company_name': 'Dazzlesphere',
        'task_date': '2022-06-12',
        'task_description': 'proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ronda Ellaman',
        'email': 'rellaman4y@elegantthemes.com',
        'company_name': 'Zoonoodle',
        'task_date': '2021-11-15',
        'task_description': 'pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Crichton Carlson',
        'email': 'ccarlson4z@google.com.hk',
        'company_name': 'Quinu',
        'task_date': '2022-04-29',
        'task_description': 'purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Wylie O\' Markey',
        'email': 'wo50@canalblog.com',
        'company_name': 'Thoughtworks',
        'task_date': '2022-07-22',
        'task_description': 'dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Emmaline Pobjay',
        'email': 'epobjay51@intel.com',
        'company_name': 'Skinix',
        'task_date': '2022-10-29',
        'task_description': 'orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Anastasia Fabry',
        'email': 'afabry52@github.com',
        'company_name': 'Skajo',
        'task_date': '2022-01-31',
        'task_description': 'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Elfreda Dye',
        'email': 'edye53@pagesperso-orange.fr',
        'company_name': 'Twitternation',
        'task_date': '2022-03-22',
        'task_description': 'dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Shirlene Beall',
        'email': 'sbeall54@slashdot.org',
        'company_name': 'Photobean',
        'task_date': '2021-12-22',
        'task_description': 'sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Annamaria Rawles',
        'email': 'arawles55@mozilla.org',
        'company_name': 'Innotype',
        'task_date': '2022-04-01',
        'task_description': 'scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Donny Gueny',
        'email': 'dgueny56@mysql.com',
        'company_name': 'Eamia',
        'task_date': '2022-04-24',
        'task_description': 'morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Melania Burn',
        'email': 'mburn57@comcast.net',
        'company_name': 'Browsedrive',
        'task_date': '2022-06-11',
        'task_description': 'duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Marietta Pickett',
        'email': 'mpickett58@gnu.org',
        'company_name': 'Fiveclub',
        'task_date': '2022-01-28',
        'task_description': 'amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Renell Saundercock',
        'email': 'rsaundercock59@godaddy.com',
        'company_name': 'Skalith',
        'task_date': '2022-07-08',
        'task_description': 'dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Georgie Lenaghen',
        'email': 'glenaghen5a@patch.com',
        'company_name': 'Avamba',
        'task_date': '2022-04-18',
        'task_description': 'consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Piotr Northing',
        'email': 'pnorthing5b@prlog.org',
        'company_name': 'Pixope',
        'task_date': '2022-06-25',
        'task_description': 'ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alva Kort',
        'email': 'akort5c@umn.edu',
        'company_name': 'Pixonyx',
        'task_date': '2022-07-27',
        'task_description': 'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jonathon Crutchley',
        'email': 'jcrutchley5d@facebook.com',
        'company_name': 'Vinder',
        'task_date': '2022-04-12',
        'task_description': 'nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Emily Durnford',
        'email': 'edurnford5e@wix.com',
        'company_name': 'Livetube',
        'task_date': '2022-06-22',
        'task_description': 'ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Donnie Sterrick',
        'email': 'dsterrick5f@discuz.net',
        'company_name': 'Gabspot',
        'task_date': '2021-11-25',
        'task_description': 'justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Chrissy Maggill\'Andreis',
        'email': 'cmaggillandreis5g@fema.gov',
        'company_name': 'Leenti',
        'task_date': '2022-10-25',
        'task_description': 'nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Shandee Petroulis',
        'email': 'spetroulis5h@google.co.uk',
        'company_name': 'Divape',
        'task_date': '2022-04-06',
        'task_description': 'nullam orci pede venenatis non sodales sed tincidunt eu felis fusce',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Brit Pearne',
        'email': 'bpearne5i@berkeley.edu',
        'company_name': 'Pixope',
        'task_date': '2022-04-01',
        'task_description': 'sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Angeli Waite',
        'email': 'awaite5j@hhs.gov',
        'company_name': 'Pixonyx',
        'task_date': '2022-09-27',
        'task_description': 'semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Polly Casel',
        'email': 'pcasel5k@vinaora.com',
        'company_name': 'Flashdog',
        'task_date': '2022-11-12',
        'task_description': 'adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Liliane Roome',
        'email': 'lroome5l@wikimedia.org',
        'company_name': 'Edgepulse',
        'task_date': '2022-05-27',
        'task_description': 'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Mose Jaouen',
        'email': 'mjaouen5m@ask.com',
        'company_name': 'Vidoo',
        'task_date': '2022-09-13',
        'task_description': 'morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kennett Brockbank',
        'email': 'kbrockbank5n@pen.io',
        'company_name': 'Lazz',
        'task_date': '2022-09-19',
        'task_description': 'accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jaimie Noe',
        'email': 'jnoe5o@bbc.co.uk',
        'company_name': 'Jaxnation',
        'task_date': '2022-07-25',
        'task_description': 'eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Corly Beneix',
        'email': 'cbeneix5p@blog.com',
        'company_name': 'Aivee',
        'task_date': '2022-06-06',
        'task_description': 'maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Welsh Gockelen',
        'email': 'wgockelen5q@shinystat.com',
        'company_name': 'Fivespan',
        'task_date': '2021-12-03',
        'task_description': 'lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dilan Crowche',
        'email': 'dcrowche5r@e-recht24.de',
        'company_name': 'Gabtune',
        'task_date': '2022-01-26',
        'task_description': 'eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Adriane Behagg',
        'email': 'abehagg5s@hao123.com',
        'company_name': 'Bubblemix',
        'task_date': '2021-12-28',
        'task_description': 'varius nulla facilisi cras non velit nec nisi vulputate nonummy',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kaylil Deeks',
        'email': 'kdeeks5t@mac.com',
        'company_name': 'Quinu',
        'task_date': '2022-07-11',
        'task_description': 'convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Domingo Haskett',
        'email': 'dhaskett5u@auda.org.au',
        'company_name': 'Fanoodle',
        'task_date': '2022-02-02',
        'task_description': 'est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Austina Rouby',
        'email': 'arouby5v@google.ca',
        'company_name': 'Twiyo',
        'task_date': '2022-10-26',
        'task_description': 'molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lulu Lindwasser',
        'email': 'llindwasser5w@wikipedia.org',
        'company_name': 'Brainsphere',
        'task_date': '2022-04-20',
        'task_description': 'libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Warde Bellew',
        'email': 'wbellew5x@hp.com',
        'company_name': 'Wordware',
        'task_date': '2022-03-30',
        'task_description': 'tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Leonanie Surfleet',
        'email': 'lsurfleet5y@cornell.edu',
        'company_name': 'Abatz',
        'task_date': '2022-02-27',
        'task_description': 'potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Pippo Glas',
        'email': 'pglas5z@lycos.com',
        'company_name': 'Photobean',
        'task_date': '2022-06-10',
        'task_description': 'nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Patience Collman',
        'email': 'pcollman60@sciencedaily.com',
        'company_name': 'Tazz',
        'task_date': '2022-09-19',
        'task_description': 'vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Dita Tranckle',
        'email': 'dtranckle61@gnu.org',
        'company_name': 'Latz',
        'task_date': '2022-09-29',
        'task_description': 'ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Veronika Payze',
        'email': 'vpayze62@friendfeed.com',
        'company_name': 'Feedmix',
        'task_date': '2022-08-12',
        'task_description': 'lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lazarus Incogna',
        'email': 'lincogna63@prweb.com',
        'company_name': 'Gigazoom',
        'task_date': '2022-01-23',
        'task_description': 'id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Gran Lilleyman',
        'email': 'glilleyman64@adobe.com',
        'company_name': 'Tanoodle',
        'task_date': '2022-03-25',
        'task_description': 'scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Auberon Roycroft',
        'email': 'aroycroft65@pcworld.com',
        'company_name': 'Meezzy',
        'task_date': '2021-11-27',
        'task_description': 'nisl nunc nisl duis bibendum felis sed interdum venenatis turpis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Maxie MacLennan',
        'email': 'mmaclennan66@bigcartel.com',
        'company_name': 'Jetwire',
        'task_date': '2022-06-04',
        'task_description': 'orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Giusto Mallett',
        'email': 'gmallett67@pinterest.com',
        'company_name': 'Zoonoodle',
        'task_date': '2022-10-03',
        'task_description': 'donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Aubrie Batsford',
        'email': 'abatsford68@google.de',
        'company_name': 'Kwideo',
        'task_date': '2022-06-12',
        'task_description': 'est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Robinet Besse',
        'email': 'rbesse69@tiny.cc',
        'company_name': 'Centimia',
        'task_date': '2021-12-03',
        'task_description': 'morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lari Bartoszewicz',
        'email': 'lbartoszewicz6a@hp.com',
        'company_name': 'Agimba',
        'task_date': '2022-10-20',
        'task_description': 'sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cate Chiese',
        'email': 'cchiese6b@telegraph.co.uk',
        'company_name': 'Skyvu',
        'task_date': '2022-06-26',
        'task_description': 'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Dannye Ould',
        'email': 'dould6c@ox.ac.uk',
        'company_name': 'Feednation',
        'task_date': '2022-05-06',
        'task_description': 'id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Alyda Matusiak',
        'email': 'amatusiak6d@columbia.edu',
        'company_name': 'Gabcube',
        'task_date': '2022-04-01',
        'task_description': 'fusce lacus purus aliquet at feugiat non pretium quis lectus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Carney Itzchaki',
        'email': 'citzchaki6e@cmu.edu',
        'company_name': 'Mydeo',
        'task_date': '2021-12-28',
        'task_description': 'curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Yorgo Librey',
        'email': 'ylibrey6f@ucoz.ru',
        'company_name': 'Twinder',
        'task_date': '2022-03-11',
        'task_description': 'turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Zitella Runsey',
        'email': 'zrunsey6g@sciencedaily.com',
        'company_name': 'Quamba',
        'task_date': '2021-12-25',
        'task_description': 'interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nat Dunstall',
        'email': 'ndunstall6h@bandcamp.com',
        'company_name': 'Dabshots',
        'task_date': '2022-09-01',
        'task_description': 'volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Marion McCallister',
        'email': 'mmccallister6i@fda.gov',
        'company_name': 'Yadel',
        'task_date': '2022-01-01',
        'task_description': 'vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lenora Blowfelde',
        'email': 'lblowfelde6j@homestead.com',
        'company_name': 'Eadel',
        'task_date': '2022-06-14',
        'task_description': 'pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ed McCrow',
        'email': 'emccrow6k@google.ru',
        'company_name': 'Yabox',
        'task_date': '2022-02-22',
        'task_description': 'ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gunilla Le Gassick',
        'email': 'gle6l@cbslocal.com',
        'company_name': 'Voolith',
        'task_date': '2022-09-03',
        'task_description': 'platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jemimah Hollyar',
        'email': 'jhollyar6m@hc360.com',
        'company_name': 'Thoughtbeat',
        'task_date': '2021-12-20',
        'task_description': 'magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Millard Buzza',
        'email': 'mbuzza6n@twitpic.com',
        'company_name': 'Eidel',
        'task_date': '2022-03-14',
        'task_description': 'tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Andromache Alessandrelli',
        'email': 'aalessandrelli6o@sciencedirect.com',
        'company_name': 'Topicstorm',
        'task_date': '2022-01-14',
        'task_description': 'vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gianni Bushe',
        'email': 'gbushe6p@tmall.com',
        'company_name': 'Bluezoom',
        'task_date': '2022-10-05',
        'task_description': 'felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ira Lucchi',
        'email': 'ilucchi6q@howstuffworks.com',
        'company_name': 'Topiczoom',
        'task_date': '2022-02-17',
        'task_description': 'dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dolli Sidnell',
        'email': 'dsidnell6r@google.ru',
        'company_name': 'Youopia',
        'task_date': '2022-04-15',
        'task_description': 'proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Chandler Prater',
        'email': 'cprater6s@noaa.gov',
        'company_name': 'Thoughtbeat',
        'task_date': '2022-05-21',
        'task_description': 'in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Marco Dyke',
        'email': 'mdyke6t@reverbnation.com',
        'company_name': 'Camido',
        'task_date': '2022-06-12',
        'task_description': 'condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Blinnie Doumer',
        'email': 'bdoumer6u@mozilla.org',
        'company_name': 'Feednation',
        'task_date': '2022-06-14',
        'task_description': 'sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lucine Mariyushkin',
        'email': 'lmariyushkin6v@angelfire.com',
        'company_name': 'Realbridge',
        'task_date': '2022-06-22',
        'task_description': 'fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hortensia MacElholm',
        'email': 'hmacelholm6w@wsj.com',
        'company_name': 'Twitternation',
        'task_date': '2022-10-17',
        'task_description': 'elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Thorsten Coggeshall',
        'email': 'tcoggeshall6x@yahoo.co.jp',
        'company_name': 'Kwinu',
        'task_date': '2022-10-07',
        'task_description': 'nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Henka Pietzke',
        'email': 'hpietzke6y@microsoft.com',
        'company_name': 'Zoonoodle',
        'task_date': '2022-03-28',
        'task_description': 'lacinia aenean sit amet justo morbi ut odio cras mi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Modesty Hapke',
        'email': 'mhapke6z@yahoo.co.jp',
        'company_name': 'Devpoint',
        'task_date': '2022-10-19',
        'task_description': 'ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jobi Seymour',
        'email': 'jseymour70@ifeng.com',
        'company_name': 'Brightbean',
        'task_date': '2022-11-06',
        'task_description': 'semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Maryellen Packwood',
        'email': 'mpackwood71@dell.com',
        'company_name': 'Aimbu',
        'task_date': '2022-07-13',
        'task_description': 'sapien varius ut blandit non interdum in ante vestibulum ante ipsum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Wallache Joynes',
        'email': 'wjoynes72@auda.org.au',
        'company_name': 'Izio',
        'task_date': '2022-08-22',
        'task_description': 'eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Oren Manilow',
        'email': 'omanilow73@opensource.org',
        'company_name': 'Brainverse',
        'task_date': '2022-02-21',
        'task_description': 'ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Johnna Wickliffe',
        'email': 'jwickliffe74@163.com',
        'company_name': 'Ntag',
        'task_date': '2022-10-12',
        'task_description': 'posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Dacia Slimings',
        'email': 'dslimings75@latimes.com',
        'company_name': 'Realpoint',
        'task_date': '2022-02-19',
        'task_description': 'vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rose Hawkin',
        'email': 'rhawkin76@sciencedirect.com',
        'company_name': 'Midel',
        'task_date': '2022-10-30',
        'task_description': 'eros elementum pellentesque quisque porta volutpat erat quisque erat eros',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Fransisco Baguley',
        'email': 'fbaguley77@amazon.com',
        'company_name': 'Devshare',
        'task_date': '2022-09-10',
        'task_description': 'mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Clemmie Bainton',
        'email': 'cbainton78@abc.net.au',
        'company_name': 'Wikizz',
        'task_date': '2022-09-28',
        'task_description': 'ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Briant Carrier',
        'email': 'bcarrier79@vk.com',
        'company_name': 'Ooba',
        'task_date': '2021-12-28',
        'task_description': 'orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kip Frangleton',
        'email': 'kfrangleton7a@bloomberg.com',
        'company_name': 'Twimm',
        'task_date': '2022-09-19',
        'task_description': 'nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Itch Heistermann',
        'email': 'iheistermann7b@google.it',
        'company_name': 'Rhyloo',
        'task_date': '2022-02-07',
        'task_description': 'justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Janifer Auden',
        'email': 'jauden7c@yellowbook.com',
        'company_name': 'Jamia',
        'task_date': '2022-05-18',
        'task_description': 'nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jamesy Rumbold',
        'email': 'jrumbold7d@home.pl',
        'company_name': 'Wikizz',
        'task_date': '2022-06-28',
        'task_description': 'dui maecenas tristique est et tempus semper est quam pharetra',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Rozanne Ingamells',
        'email': 'ringamells7e@si.edu',
        'company_name': 'Tavu',
        'task_date': '2021-12-30',
        'task_description': 'nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jarred Whytock',
        'email': 'jwhytock7f@mlb.com',
        'company_name': 'Quimba',
        'task_date': '2022-05-07',
        'task_description': 'lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lucho Dewsnap',
        'email': 'ldewsnap7g@pinterest.com',
        'company_name': 'Demizz',
        'task_date': '2022-11-06',
        'task_description': 'nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Bonni Waiting',
        'email': 'bwaiting7h@multiply.com',
        'company_name': 'Vidoo',
        'task_date': '2022-04-14',
        'task_description': 'nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lisetta Haversum',
        'email': 'lhaversum7i@sfgate.com',
        'company_name': 'Babblestorm',
        'task_date': '2022-03-03',
        'task_description': 'in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rayshell Farnie',
        'email': 'rfarnie7j@time.com',
        'company_name': 'Mydo',
        'task_date': '2022-05-03',
        'task_description': 'tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nathanil Alvarez',
        'email': 'nalvarez7k@yellowbook.com',
        'company_name': 'Riffwire',
        'task_date': '2022-03-14',
        'task_description': 'neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Horst Moakes',
        'email': 'hmoakes7l@ibm.com',
        'company_name': 'Bubblemix',
        'task_date': '2022-05-22',
        'task_description': 'cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cathleen Edling',
        'email': 'cedling7m@slashdot.org',
        'company_name': 'Omba',
        'task_date': '2022-01-28',
        'task_description': 'nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Margit Hoyer',
        'email': 'mhoyer7n@networkadvertising.org',
        'company_name': 'Wordtune',
        'task_date': '2021-11-27',
        'task_description': 'ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Shirline Unstead',
        'email': 'sunstead7o@zdnet.com',
        'company_name': 'Riffwire',
        'task_date': '2022-01-22',
        'task_description': 'nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Marcela Peeke',
        'email': 'mpeeke7p@fda.gov',
        'company_name': 'Thoughtbridge',
        'task_date': '2022-09-20',
        'task_description': 'rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kissiah Diess',
        'email': 'kdiess7q@sina.com.cn',
        'company_name': 'Riffpedia',
        'task_date': '2022-02-07',
        'task_description': 'libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Stacee Maciejak',
        'email': 'smaciejak7r@histats.com',
        'company_name': 'Vitz',
        'task_date': '2022-04-18',
        'task_description': 'leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Corby Lovat',
        'email': 'clovat7s@google.es',
        'company_name': 'Twitterbridge',
        'task_date': '2022-06-16',
        'task_description': 'in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Seumas Prahm',
        'email': 'sprahm7t@de.vu',
        'company_name': 'Divape',
        'task_date': '2022-05-25',
        'task_description': 'morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kaylee Willets',
        'email': 'kwillets7u@ft.com',
        'company_name': 'Pixoboo',
        'task_date': '2021-11-15',
        'task_description': 'pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Noemi Woodfine',
        'email': 'nwoodfine7v@smh.com.au',
        'company_name': 'Viva',
        'task_date': '2022-08-18',
        'task_description': 'pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sigismondo Renyard',
        'email': 'srenyard7w@qq.com',
        'company_name': 'Flipopia',
        'task_date': '2022-06-18',
        'task_description': 'nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kelvin Donaghy',
        'email': 'kdonaghy7x@drupal.org',
        'company_name': 'Quamba',
        'task_date': '2021-11-17',
        'task_description': 'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lenci Hearst',
        'email': 'lhearst7y@wsj.com',
        'company_name': 'Youopia',
        'task_date': '2022-10-02',
        'task_description': 'integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Berget Haile',
        'email': 'bhaile7z@freewebs.com',
        'company_name': 'Blogtag',
        'task_date': '2022-10-01',
        'task_description': 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Min Balog',
        'email': 'mbalog80@auda.org.au',
        'company_name': 'Mymm',
        'task_date': '2021-12-11',
        'task_description': 'ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Corissa Bentham',
        'email': 'cbentham81@ucoz.com',
        'company_name': 'Quaxo',
        'task_date': '2022-10-12',
        'task_description': 'pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Belinda Haigh',
        'email': 'bhaigh82@wikimedia.org',
        'company_name': 'Eabox',
        'task_date': '2022-10-04',
        'task_description': 'sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Josephine Bertie',
        'email': 'jbertie83@rakuten.co.jp',
        'company_name': 'Twitterlist',
        'task_date': '2022-01-27',
        'task_description': 'in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Matt Plues',
        'email': 'mplues84@studiopress.com',
        'company_name': 'Janyx',
        'task_date': '2022-07-25',
        'task_description': 'odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jacquetta Radenhurst',
        'email': 'jradenhurst85@weebly.com',
        'company_name': 'Ailane',
        'task_date': '2022-03-04',
        'task_description': 'tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Darren Nesey',
        'email': 'dnesey86@hubpages.com',
        'company_name': 'Fadeo',
        'task_date': '2022-03-31',
        'task_description': 'proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Zulema Arnaldi',
        'email': 'zarnaldi87@multiply.com',
        'company_name': 'DabZ',
        'task_date': '2021-12-02',
        'task_description': 'sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Roderick Deegin',
        'email': 'rdeegin88@sitemeter.com',
        'company_name': 'Skinix',
        'task_date': '2022-10-15',
        'task_description': 'fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Cinderella Philbrook',
        'email': 'cphilbrook89@google.nl',
        'company_name': 'Jabbertype',
        'task_date': '2022-10-11',
        'task_description': 'erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Dalis Sheaber',
        'email': 'dsheaber8a@nba.com',
        'company_name': 'Vimbo',
        'task_date': '2022-10-31',
        'task_description': 'volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Edie MacCart',
        'email': 'emaccart8b@imgur.com',
        'company_name': 'Minyx',
        'task_date': '2022-05-24',
        'task_description': 'aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cleon Thurman',
        'email': 'cthurman8c@seesaa.net',
        'company_name': 'Yodo',
        'task_date': '2022-06-06',
        'task_description': 'in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nathan Fielder',
        'email': 'nfielder8d@unc.edu',
        'company_name': 'Demizz',
        'task_date': '2021-12-22',
        'task_description': 'mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Stearne Shortall',
        'email': 'sshortall8e@goodreads.com',
        'company_name': 'Dabfeed',
        'task_date': '2022-06-26',
        'task_description': 'sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Randolph Tincknell',
        'email': 'rtincknell8f@google.nl',
        'company_name': 'Quimm',
        'task_date': '2022-06-26',
        'task_description': 'morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Dorelia Breheny',
        'email': 'dbreheny8g@ox.ac.uk',
        'company_name': 'Yata',
        'task_date': '2022-02-22',
        'task_description': 'justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Jessalin Skellern',
        'email': 'jskellern8h@sina.com.cn',
        'company_name': 'Jabbercube',
        'task_date': '2022-06-02',
        'task_description': 'nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lilith Grasha',
        'email': 'lgrasha8i@vimeo.com',
        'company_name': 'Babblestorm',
        'task_date': '2022-07-04',
        'task_description': 'risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Wendel Soden',
        'email': 'wsoden8j@webeden.co.uk',
        'company_name': 'Ooba',
        'task_date': '2022-01-13',
        'task_description': 'at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Marguerite McKellar',
        'email': 'mmckellar8k@cloudflare.com',
        'company_name': 'Bubblebox',
        'task_date': '2021-12-06',
        'task_description': 'at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Evered Erdely',
        'email': 'eerdely8l@biglobe.ne.jp',
        'company_name': 'Demimbu',
        'task_date': '2022-09-15',
        'task_description': 'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ebony Dionisio',
        'email': 'edionisio8m@time.com',
        'company_name': 'Flipopia',
        'task_date': '2022-03-23',
        'task_description': 'amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jules Cluelow',
        'email': 'jcluelow8n@ca.gov',
        'company_name': 'Zoozzy',
        'task_date': '2022-07-05',
        'task_description': 'urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Libbi Brattan',
        'email': 'lbrattan8o@soundcloud.com',
        'company_name': 'Digitube',
        'task_date': '2022-08-22',
        'task_description': 'quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Uta Wrightham',
        'email': 'uwrightham8p@shareasale.com',
        'company_name': 'Topiclounge',
        'task_date': '2021-12-20',
        'task_description': 'nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Riordan Howison',
        'email': 'rhowison8q@bloglovin.com',
        'company_name': 'Linklinks',
        'task_date': '2022-07-30',
        'task_description': 'vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Erda Diddams',
        'email': 'ediddams8r@wufoo.com',
        'company_name': 'Dynabox',
        'task_date': '2022-01-16',
        'task_description': 'aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ruthe Brigge',
        'email': 'rbrigge8s@linkedin.com',
        'company_name': 'Rhycero',
        'task_date': '2022-06-15',
        'task_description': 'aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jeanelle Le Maitre',
        'email': 'jle8t@toplist.cz',
        'company_name': 'Ntags',
        'task_date': '2022-03-22',
        'task_description': 'pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hewie Sarten',
        'email': 'hsarten8u@bizjournals.com',
        'company_name': 'Avamba',
        'task_date': '2021-12-05',
        'task_description': 'lorem id ligula suspendisse ornare consequat lectus in est risus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Oliviero Serot',
        'email': 'oserot8v@sciencedirect.com',
        'company_name': 'Flashset',
        'task_date': '2022-03-31',
        'task_description': 'semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique tortor eu',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Trev Philipard',
        'email': 'tphilipard8w@msu.edu',
        'company_name': 'Aibox',
        'task_date': '2021-11-28',
        'task_description': 'maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cati Nurdin',
        'email': 'cnurdin8x@themeforest.net',
        'company_name': 'Zoomlounge',
        'task_date': '2022-07-13',
        'task_description': 'amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Carissa Sallenger',
        'email': 'csallenger8y@yellowbook.com',
        'company_name': 'Tagcat',
        'task_date': '2022-02-09',
        'task_description': 'consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Bard Fould',
        'email': 'bfould8z@purevolume.com',
        'company_name': 'Tanoodle',
        'task_date': '2022-04-20',
        'task_description': 'nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Gilda Culleford',
        'email': 'gculleford90@so-net.ne.jp',
        'company_name': 'Bluejam',
        'task_date': '2022-06-03',
        'task_description': 'mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sephira Lamberto',
        'email': 'slamberto91@archive.org',
        'company_name': 'Linkbridge',
        'task_date': '2022-11-09',
        'task_description': 'donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nilson Fluger',
        'email': 'nfluger92@last.fm',
        'company_name': 'Tekfly',
        'task_date': '2022-05-30',
        'task_description': 'consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Isacco Sarra',
        'email': 'isarra93@smugmug.com',
        'company_name': 'Skiptube',
        'task_date': '2021-11-21',
        'task_description': 'pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Abbey Curedale',
        'email': 'acuredale94@acquirethisname.com',
        'company_name': 'Rhynyx',
        'task_date': '2022-04-16',
        'task_description': 'venenatis tristique fusce congue diam id ornare imperdiet sapien urna',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ariana Farron',
        'email': 'afarron95@tripod.com',
        'company_name': 'Miboo',
        'task_date': '2021-12-03',
        'task_description': 'varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lutero Giamuzzo',
        'email': 'lgiamuzzo96@gizmodo.com',
        'company_name': 'Rhycero',
        'task_date': '2021-12-29',
        'task_description': 'nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Diena Martinez',
        'email': 'dmartinez97@booking.com',
        'company_name': 'Aibox',
        'task_date': '2022-04-23',
        'task_description': 'diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Harris Lyles',
        'email': 'hlyles98@amazonaws.com',
        'company_name': 'Dynazzy',
        'task_date': '2022-04-02',
        'task_description': 'varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Cherrita Styant',
        'email': 'cstyant99@ask.com',
        'company_name': 'Dabfeed',
        'task_date': '2022-10-31',
        'task_description': 'cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Tonia Durban',
        'email': 'tdurban9a@paypal.com',
        'company_name': 'Gabspot',
        'task_date': '2022-04-07',
        'task_description': 'id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lavinie Coales',
        'email': 'lcoales9b@patch.com',
        'company_name': 'Mita',
        'task_date': '2022-06-07',
        'task_description': 'duis consequat dui nec nisi volutpat eleifend donec ut dolor',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Clementius Staddart',
        'email': 'cstaddart9c@artisteer.com',
        'company_name': 'Tekfly',
        'task_date': '2022-08-21',
        'task_description': 'ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Silvain O\'Heneghan',
        'email': 'soheneghan9d@mlb.com',
        'company_name': 'Quamba',
        'task_date': '2022-03-05',
        'task_description': 'maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kerry Biffen',
        'email': 'kbiffen9e@gov.uk',
        'company_name': 'Lajo',
        'task_date': '2022-09-16',
        'task_description': 'imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cristine MacAscaidh',
        'email': 'cmacascaidh9f@who.int',
        'company_name': 'Omba',
        'task_date': '2022-05-20',
        'task_description': 'at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Eben Kinforth',
        'email': 'ekinforth9g@youku.com',
        'company_name': 'Shufflebeat',
        'task_date': '2022-02-20',
        'task_description': 'eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ameline Longthorne',
        'email': 'alongthorne9h@scientificamerican.com',
        'company_name': 'Rhynoodle',
        'task_date': '2021-12-21',
        'task_description': 'id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Eduino Bottrell',
        'email': 'ebottrell9i@booking.com',
        'company_name': 'Lazzy',
        'task_date': '2021-11-20',
        'task_description': 'eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Traver Filler',
        'email': 'tfiller9j@histats.com',
        'company_name': 'Wikizz',
        'task_date': '2022-04-03',
        'task_description': 'dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Saudra Mully',
        'email': 'smully9k@istockphoto.com',
        'company_name': 'Plambee',
        'task_date': '2022-08-21',
        'task_description': 'suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Casie Endacott',
        'email': 'cendacott9l@privacy.gov.au',
        'company_name': 'Yodo',
        'task_date': '2021-11-19',
        'task_description': 'ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Crista Jannex',
        'email': 'cjannex9m@yolasite.com',
        'company_name': 'Quimm',
        'task_date': '2022-05-04',
        'task_description': 'posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rivkah Musgrave',
        'email': 'rmusgrave9n@geocities.jp',
        'company_name': 'Riffpath',
        'task_date': '2022-05-21',
        'task_description': 'sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Willabella Kleinsinger',
        'email': 'wkleinsinger9o@domainmarket.com',
        'company_name': 'Devcast',
        'task_date': '2022-08-28',
        'task_description': 'leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ayn Quinion',
        'email': 'aquinion9p@ameblo.jp',
        'company_name': 'Ntag',
        'task_date': '2022-02-01',
        'task_description': 'ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Stephan Sands-Allan',
        'email': 'ssandsallan9q@umich.edu',
        'company_name': 'Avamm',
        'task_date': '2022-02-25',
        'task_description': 'id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dreddy Hemstead',
        'email': 'dhemstead9r@jiathis.com',
        'company_name': 'Feedmix',
        'task_date': '2021-12-13',
        'task_description': 'massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lombard Reubel',
        'email': 'lreubel9s@woothemes.com',
        'company_name': 'Feedbug',
        'task_date': '2022-10-29',
        'task_description': 'rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jenny Clemo',
        'email': 'jclemo9t@chicagotribune.com',
        'company_name': 'Thoughtworks',
        'task_date': '2021-11-30',
        'task_description': 'leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Elise Westpfel',
        'email': 'ewestpfel9u@yahoo.co.jp',
        'company_name': 'Roodel',
        'task_date': '2022-09-27',
        'task_description': 'massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Delmore Alban',
        'email': 'dalban9v@addtoany.com',
        'company_name': 'Avaveo',
        'task_date': '2022-01-10',
        'task_description': 'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Blaine Humbie',
        'email': 'bhumbie9w@amazon.co.jp',
        'company_name': 'Jabbercube',
        'task_date': '2022-04-02',
        'task_description': 'non mi integer ac neque duis bibendum morbi non quam nec dui luctus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Dody Simoncini',
        'email': 'dsimoncini9x@marriott.com',
        'company_name': 'Kanoodle',
        'task_date': '2022-01-11',
        'task_description': 'dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Zarah Meran',
        'email': 'zmeran9y@deliciousdays.com',
        'company_name': 'Zoomzone',
        'task_date': '2022-10-05',
        'task_description': 'augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Malena Maffezzoli',
        'email': 'mmaffezzoli9z@ox.ac.uk',
        'company_name': 'Tagopia',
        'task_date': '2021-11-28',
        'task_description': 'luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Bethany Tainton',
        'email': 'btaintona0@parallels.com',
        'company_name': 'BlogXS',
        'task_date': '2022-06-14',
        'task_description': 'molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cacilia Mouse',
        'email': 'cmousea1@soundcloud.com',
        'company_name': 'Jaxnation',
        'task_date': '2022-10-06',
        'task_description': 'tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Emelyne Caldow',
        'email': 'ecaldowa2@wiley.com',
        'company_name': 'Wikivu',
        'task_date': '2021-11-19',
        'task_description': 'lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Adams Toten',
        'email': 'atotena3@shutterfly.com',
        'company_name': 'Jaxspan',
        'task_date': '2022-08-06',
        'task_description': 'purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ermentrude Buxton',
        'email': 'ebuxtona4@elegantthemes.com',
        'company_name': 'Skiptube',
        'task_date': '2021-11-26',
        'task_description': 'in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Marthena Gercke',
        'email': 'mgerckea5@cmu.edu',
        'company_name': 'Youopia',
        'task_date': '2022-08-25',
        'task_description': 'vel augue vestibulum ante ipsum primis in faucibus orci luctus et',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jaimie Samuel',
        'email': 'jsamuela6@oakley.com',
        'company_name': 'Tagtune',
        'task_date': '2022-08-16',
        'task_description': 'volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Thia Bernon',
        'email': 'tbernona7@sakura.ne.jp',
        'company_name': 'Edgewire',
        'task_date': '2022-01-01',
        'task_description': 'id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Adaline Holston',
        'email': 'aholstona8@dedecms.com',
        'company_name': 'Cogilith',
        'task_date': '2022-09-05',
        'task_description': 'venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Tremayne Babber',
        'email': 'tbabbera9@soundcloud.com',
        'company_name': 'Zoomdog',
        'task_date': '2022-06-01',
        'task_description': 'at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Bert Fairham',
        'email': 'bfairhamaa@examiner.com',
        'company_name': 'Fatz',
        'task_date': '2022-10-27',
        'task_description': 'condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Gustavo Fayne',
        'email': 'gfayneab@google.co.jp',
        'company_name': 'Riffpath',
        'task_date': '2022-07-03',
        'task_description': 'proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Winonah Maffy',
        'email': 'wmaffyac@godaddy.com',
        'company_name': 'Skinix',
        'task_date': '2022-06-30',
        'task_description': 'commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Maurine Laden',
        'email': 'mladenad@furl.net',
        'company_name': 'Zoozzy',
        'task_date': '2022-03-27',
        'task_description': 'ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Nan Castagno',
        'email': 'ncastagnoae@github.com',
        'company_name': 'Flashset',
        'task_date': '2022-10-24',
        'task_description': 'quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dottie Viger',
        'email': 'dvigeraf@instagram.com',
        'company_name': 'Innotype',
        'task_date': '2022-08-19',
        'task_description': 'vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lynnet Shalcros',
        'email': 'lshalcrosag@pbs.org',
        'company_name': 'Meetz',
        'task_date': '2022-07-14',
        'task_description': 'rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jaine Bexley',
        'email': 'jbexleyah@ox.ac.uk',
        'company_name': 'Reallinks',
        'task_date': '2022-03-01',
        'task_description': 'dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sunny Bullene',
        'email': 'sbulleneai@google.cn',
        'company_name': 'Roombo',
        'task_date': '2022-02-26',
        'task_description': 'arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Roman Corker',
        'email': 'rcorkeraj@constantcontact.com',
        'company_name': 'Kazio',
        'task_date': '2022-01-19',
        'task_description': 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lonni Buckle',
        'email': 'lbuckleak@vk.com',
        'company_name': 'Mycat',
        'task_date': '2022-03-15',
        'task_description': 'dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ferrell Hauxby',
        'email': 'fhauxbyal@usgs.gov',
        'company_name': 'Browseblab',
        'task_date': '2021-12-25',
        'task_description': 'pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Freddy Cahill',
        'email': 'fcahillam@unc.edu',
        'company_name': 'Ntag',
        'task_date': '2022-05-02',
        'task_description': 'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ethel Glasscock',
        'email': 'eglasscockan@nifty.com',
        'company_name': 'Pixoboo',
        'task_date': '2022-01-11',
        'task_description': 'a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Granville Machin',
        'email': 'gmachinao@cloudflare.com',
        'company_name': 'Trilia',
        'task_date': '2022-06-17',
        'task_description': 'mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kaspar Schafer',
        'email': 'kschaferap@addtoany.com',
        'company_name': 'Divavu',
        'task_date': '2022-09-16',
        'task_description': 'interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Rolland Laurenzi',
        'email': 'rlaurenziaq@cdbaby.com',
        'company_name': 'Plambee',
        'task_date': '2021-12-31',
        'task_description': 'in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Mirna Cozens',
        'email': 'mcozensar@about.com',
        'company_name': 'Quire',
        'task_date': '2022-01-14',
        'task_description': 'porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Doug Shugg',
        'email': 'dshuggas@theguardian.com',
        'company_name': 'Babbleset',
        'task_date': '2022-11-02',
        'task_description': 'aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Allie Wrist',
        'email': 'awristat@time.com',
        'company_name': 'Izio',
        'task_date': '2022-04-24',
        'task_description': 'vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Michal Northwood',
        'email': 'mnorthwoodau@google.com.br',
        'company_name': 'Twitterlist',
        'task_date': '2022-06-02',
        'task_description': 'potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Meryl Fishbourne',
        'email': 'mfishbourneav@multiply.com',
        'company_name': 'Omba',
        'task_date': '2021-12-12',
        'task_description': 'donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Myra Deek',
        'email': 'mdeekaw@go.com',
        'company_name': 'Trilith',
        'task_date': '2022-06-03',
        'task_description': 'aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Deloria Juett',
        'email': 'djuettax@theglobeandmail.com',
        'company_name': 'Eazzy',
        'task_date': '2022-06-21',
        'task_description': 'ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Grange Kondratowicz',
        'email': 'gkondratowiczay@wikimedia.org',
        'company_name': 'Innotype',
        'task_date': '2022-08-03',
        'task_description': 'egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Modestia Catterson',
        'email': 'mcattersonaz@cbc.ca',
        'company_name': 'Rhycero',
        'task_date': '2022-04-23',
        'task_description': 'integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Torre Kleinstern',
        'email': 'tkleinsternb0@people.com.cn',
        'company_name': 'Camimbo',
        'task_date': '2022-07-20',
        'task_description': 'volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Izak Boow',
        'email': 'iboowb1@yahoo.com',
        'company_name': 'Teklist',
        'task_date': '2022-08-08',
        'task_description': 'vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Elvis McGenis',
        'email': 'emcgenisb2@google.com',
        'company_name': 'Dabfeed',
        'task_date': '2022-06-09',
        'task_description': 'penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Torry Bandt',
        'email': 'tbandtb3@google.it',
        'company_name': 'Lajo',
        'task_date': '2022-11-13',
        'task_description': 'varius ut blandit non interdum in ante vestibulum ante ipsum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Weber Pladen',
        'email': 'wpladenb4@geocities.jp',
        'company_name': 'Muxo',
        'task_date': '2022-07-07',
        'task_description': 'risus praesent lectus vestibulum quam sapien varius ut blandit non',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Charyl Brant',
        'email': 'cbrantb5@independent.co.uk',
        'company_name': 'Cogidoo',
        'task_date': '2022-07-19',
        'task_description': 'imperdiet et commodo vulputate justo in blandit ultrices enim lorem',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Fidelity Fairholm',
        'email': 'ffairholmb6@washington.edu',
        'company_name': 'Mybuzz',
        'task_date': '2022-01-23',
        'task_description': 'quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Terese Naismith',
        'email': 'tnaismithb7@parallels.com',
        'company_name': 'Youspan',
        'task_date': '2022-01-30',
        'task_description': 'vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Shep Buglar',
        'email': 'sbuglarb8@hatena.ne.jp',
        'company_name': 'Dynazzy',
        'task_date': '2022-03-26',
        'task_description': 'ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cammy Fassbender',
        'email': 'cfassbenderb9@samsung.com',
        'company_name': 'Agimba',
        'task_date': '2021-12-19',
        'task_description': 'erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Gabriellia Kunkel',
        'email': 'gkunkelba@google.com.hk',
        'company_name': 'Eabox',
        'task_date': '2022-07-26',
        'task_description': 'sit amet lobortis sapien sapien non mi integer ac neque duis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Merrick Moogan',
        'email': 'mmooganbb@flickr.com',
        'company_name': 'Tagtune',
        'task_date': '2022-01-30',
        'task_description': 'condimentum id luctus nec molestie sed justo pellentesque viverra pede',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kerby Perford',
        'email': 'kperfordbc@squidoo.com',
        'company_name': 'Skyble',
        'task_date': '2022-02-04',
        'task_description': 'id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Benton Johnsee',
        'email': 'bjohnseebd@abc.net.au',
        'company_name': 'Fatz',
        'task_date': '2022-08-22',
        'task_description': 'dui maecenas tristique est et tempus semper est quam pharetra magna ac',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Carline Soitoux',
        'email': 'csoitouxbe@yahoo.com',
        'company_name': 'Minyx',
        'task_date': '2022-04-26',
        'task_description': 'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Bill Torry',
        'email': 'btorrybf@4shared.com',
        'company_name': 'Buzzshare',
        'task_date': '2022-09-05',
        'task_description': 'dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Catriona Florey',
        'email': 'cfloreybg@noaa.gov',
        'company_name': 'Aibox',
        'task_date': '2021-11-28',
        'task_description': 'imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Rurik Govan',
        'email': 'rgovanbh@yellowpages.com',
        'company_name': 'Brainsphere',
        'task_date': '2022-04-09',
        'task_description': 'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nicolas Williamson',
        'email': 'nwilliamsonbi@netvibes.com',
        'company_name': 'Voolith',
        'task_date': '2022-07-28',
        'task_description': 'eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Belva Woolner',
        'email': 'bwoolnerbj@ameblo.jp',
        'company_name': 'Skyble',
        'task_date': '2022-03-10',
        'task_description': 'justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Carree Ghost',
        'email': 'cghostbk@hugedomains.com',
        'company_name': 'Thoughtbeat',
        'task_date': '2021-12-31',
        'task_description': 'porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Roanna Tollfree',
        'email': 'rtollfreebl@bloglines.com',
        'company_name': 'Blognation',
        'task_date': '2021-12-20',
        'task_description': 'pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Care Kryszkiecicz',
        'email': 'ckryszkieciczbm@blog.com',
        'company_name': 'Chatterbridge',
        'task_date': '2022-05-24',
        'task_description': 'vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Erhart Dyster',
        'email': 'edysterbn@gnu.org',
        'company_name': 'Meevee',
        'task_date': '2021-11-19',
        'task_description': 'semper rutrum nulla nunc purus phasellus in felis donec semper',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Forester Clerc',
        'email': 'fclercbo@abc.net.au',
        'company_name': 'Geba',
        'task_date': '2022-05-23',
        'task_description': 'dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Starlene Archbold',
        'email': 'sarchboldbp@blinklist.com',
        'company_name': 'BlogXS',
        'task_date': '2022-02-17',
        'task_description': 'aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Frasquito Abdon',
        'email': 'fabdonbq@scientificamerican.com',
        'company_name': 'Thoughtblab',
        'task_date': '2022-02-04',
        'task_description': 'amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Richie Belin',
        'email': 'rbelinbr@rambler.ru',
        'company_name': 'Rhycero',
        'task_date': '2021-11-27',
        'task_description': 'eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Carmita Durrad',
        'email': 'cdurradbs@sogou.com',
        'company_name': 'Flipstorm',
        'task_date': '2022-02-13',
        'task_description': 'ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Hayyim Paggitt',
        'email': 'hpaggittbt@edublogs.org',
        'company_name': 'Quaxo',
        'task_date': '2022-02-11',
        'task_description': 'suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Roosevelt Findley',
        'email': 'rfindleybu@list-manage.com',
        'company_name': 'Zoomcast',
        'task_date': '2022-08-02',
        'task_description': 'aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Axe Lindegard',
        'email': 'alindegardbv@amazon.co.jp',
        'company_name': 'Meemm',
        'task_date': '2022-05-29',
        'task_description': 'id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Edna Heatherington',
        'email': 'eheatheringtonbw@businesswire.com',
        'company_name': 'Edgewire',
        'task_date': '2022-01-30',
        'task_description': 'enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ollie McMenamy',
        'email': 'omcmenamybx@mapy.cz',
        'company_name': 'Eire',
        'task_date': '2022-02-06',
        'task_description': 'in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Maribeth Ondrak',
        'email': 'mondrakby@reddit.com',
        'company_name': 'Dabfeed',
        'task_date': '2022-03-02',
        'task_description': 'mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Saul Cuttin',
        'email': 'scuttinbz@noaa.gov',
        'company_name': 'Wikizz',
        'task_date': '2022-03-29',
        'task_description': 'massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gayel Wanless',
        'email': 'gwanlessc0@dagondesign.com',
        'company_name': 'Yotz',
        'task_date': '2022-08-29',
        'task_description': 'volutpat erat quisque erat eros viverra eget congue eget semper rutrum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Christan Cino',
        'email': 'ccinoc1@multiply.com',
        'company_name': 'Oyondu',
        'task_date': '2022-08-05',
        'task_description': 'posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Celeste Glynn',
        'email': 'cglynnc2@netscape.com',
        'company_name': 'Vipe',
        'task_date': '2021-11-20',
        'task_description': 'in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Iona Gorman',
        'email': 'igormanc3@squidoo.com',
        'company_name': 'Midel',
        'task_date': '2022-06-27',
        'task_description': 'eu est congue elementum in hac habitasse platea dictumst morbi vestibulum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Tommy Alfonzo',
        'email': 'talfonzoc4@youku.com',
        'company_name': 'Lazzy',
        'task_date': '2022-08-09',
        'task_description': 'sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Carter Nestoruk',
        'email': 'cnestorukc5@adobe.com',
        'company_name': 'Voolia',
        'task_date': '2022-08-04',
        'task_description': 'elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sheelagh Deering',
        'email': 'sdeeringc6@skyrock.com',
        'company_name': 'Leexo',
        'task_date': '2022-08-08',
        'task_description': 'leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Raquela Gilley',
        'email': 'rgilleyc7@patch.com',
        'company_name': 'Kwilith',
        'task_date': '2022-02-12',
        'task_description': 'parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Griffie Windram',
        'email': 'gwindramc8@reuters.com',
        'company_name': 'Avamba',
        'task_date': '2022-08-11',
        'task_description': 'at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Shelley Havenhand',
        'email': 'shavenhandc9@umn.edu',
        'company_name': 'Aibox',
        'task_date': '2021-12-23',
        'task_description': 'sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Geri Imlen',
        'email': 'gimlenca@illinois.edu',
        'company_name': 'Zoonoodle',
        'task_date': '2021-12-08',
        'task_description': 'hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gwenora De Ferraris',
        'email': 'gdecb@europa.eu',
        'company_name': 'Yadel',
        'task_date': '2022-02-22',
        'task_description': 'in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Suzanna Ackred',
        'email': 'sackredcc@virginia.edu',
        'company_name': 'Twinte',
        'task_date': '2022-01-10',
        'task_description': 'tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Luce Lotherington',
        'email': 'llotheringtoncd@youtube.com',
        'company_name': 'Topicstorm',
        'task_date': '2022-02-17',
        'task_description': 'magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cristin Kener',
        'email': 'ckenerce@foxnews.com',
        'company_name': 'Meemm',
        'task_date': '2022-08-01',
        'task_description': 'mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Augy Livings',
        'email': 'alivingscf@google.com.br',
        'company_name': 'Brainbox',
        'task_date': '2022-02-22',
        'task_description': 'lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Veriee Bryers',
        'email': 'vbryerscg@google.com.br',
        'company_name': 'Wordify',
        'task_date': '2022-05-07',
        'task_description': 'tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Wandis Clamp',
        'email': 'wclampch@ca.gov',
        'company_name': 'Jaxworks',
        'task_date': '2022-07-02',
        'task_description': 'parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Anne-corinne Labuschagne',
        'email': 'alabuschagneci@moonfruit.com',
        'company_name': 'Trilia',
        'task_date': '2022-04-23',
        'task_description': 'libero convallis eget eleifend luctus ultricies eu nibh quisque id justo',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Asia Linzee',
        'email': 'alinzeecj@wix.com',
        'company_name': 'Divavu',
        'task_date': '2022-07-06',
        'task_description': 'lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lindy Clatworthy',
        'email': 'lclatworthyck@discuz.net',
        'company_name': 'Jaxbean',
        'task_date': '2022-06-14',
        'task_description': 'in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Monro Deaton',
        'email': 'mdeatoncl@vistaprint.com',
        'company_name': 'Eayo',
        'task_date': '2022-06-25',
        'task_description': 'porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ardith Jeff',
        'email': 'ajeffcm@nasa.gov',
        'company_name': 'Dabfeed',
        'task_date': '2022-05-31',
        'task_description': 'nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Tobe Wallen',
        'email': 'twallencn@ox.ac.uk',
        'company_name': 'Agimba',
        'task_date': '2022-09-11',
        'task_description': 'vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lexine Hacker',
        'email': 'lhackerco@furl.net',
        'company_name': 'Flipbug',
        'task_date': '2022-05-11',
        'task_description': 'interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Antonina Haggleton',
        'email': 'ahaggletoncp@scribd.com',
        'company_name': 'Feedmix',
        'task_date': '2022-02-13',
        'task_description': 'felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Oby Damrell',
        'email': 'odamrellcq@bbb.org',
        'company_name': 'Dabtype',
        'task_date': '2022-09-06',
        'task_description': 'erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Tammie Crim',
        'email': 'tcrimcr@comsenz.com',
        'company_name': 'Minyx',
        'task_date': '2022-01-04',
        'task_description': 'varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Emmie Farndon',
        'email': 'efarndoncs@businessweek.com',
        'company_name': 'Voonyx',
        'task_date': '2022-03-11',
        'task_description': 'fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sydelle Karpychev',
        'email': 'skarpychevct@alibaba.com',
        'company_name': 'Jetpulse',
        'task_date': '2022-01-25',
        'task_description': 'morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Zared Arrol',
        'email': 'zarrolcu@ucoz.com',
        'company_name': 'Devbug',
        'task_date': '2022-09-19',
        'task_description': 'nulla neque libero convallis eget eleifend luctus ultricies eu nibh',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kermit Antoszczyk',
        'email': 'kantoszczykcv@ucoz.ru',
        'company_name': 'Twitterlist',
        'task_date': '2022-10-08',
        'task_description': 'lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hendrik Allery',
        'email': 'hallerycw@about.com',
        'company_name': 'Agivu',
        'task_date': '2022-05-21',
        'task_description': 'blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Petey MacNeish',
        'email': 'pmacneishcx@ucsd.edu',
        'company_name': 'Quinu',
        'task_date': '2022-01-28',
        'task_description': 'ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gan Cardiff',
        'email': 'gcardiffcy@hao123.com',
        'company_name': 'Avamba',
        'task_date': '2022-06-24',
        'task_description': 'nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Quinta Sked',
        'email': 'qskedcz@bravesites.com',
        'company_name': 'JumpXS',
        'task_date': '2022-06-22',
        'task_description': 'odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cornall Wych',
        'email': 'cwychd0@alexa.com',
        'company_name': 'Ailane',
        'task_date': '2022-11-10',
        'task_description': 'neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Stanley Brecknell',
        'email': 'sbrecknelld1@tamu.edu',
        'company_name': 'Skimia',
        'task_date': '2022-02-19',
        'task_description': 'mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Stefano Hazeldean',
        'email': 'shazeldeand2@163.com',
        'company_name': 'Viva',
        'task_date': '2022-02-21',
        'task_description': 'ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Hermia Death',
        'email': 'hdeathd3@clickbank.net',
        'company_name': 'Mybuzz',
        'task_date': '2022-02-26',
        'task_description': 'amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Reese Joris',
        'email': 'rjorisd4@issuu.com',
        'company_name': 'Twimm',
        'task_date': '2022-01-21',
        'task_description': 'elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kent Dowbiggin',
        'email': 'kdowbiggind5@blog.com',
        'company_name': 'Voonyx',
        'task_date': '2022-04-10',
        'task_description': 'luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Renaldo Cokayne',
        'email': 'rcokayned6@yellowbook.com',
        'company_name': 'Twinder',
        'task_date': '2022-06-29',
        'task_description': 'odio in hac habitasse platea dictumst maecenas ut massa quis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Flossy Studdert',
        'email': 'fstuddertd7@tuttocitta.it',
        'company_name': 'Voonix',
        'task_date': '2021-12-25',
        'task_description': 'ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Gerianna Turmell',
        'email': 'gturmelld8@cargocollective.com',
        'company_name': 'Jayo',
        'task_date': '2022-08-13',
        'task_description': 'ligula vehicula consequat morbi a ipsum integer a nibh in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Stanleigh Perutto',
        'email': 'speruttod9@youtu.be',
        'company_name': 'Blognation',
        'task_date': '2022-05-11',
        'task_description': 'eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alan Clemmen',
        'email': 'aclemmenda@mysql.com',
        'company_name': 'Skimia',
        'task_date': '2021-11-30',
        'task_description': 'ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lucian Lyles',
        'email': 'llylesdb@mail.ru',
        'company_name': 'Youspan',
        'task_date': '2021-11-16',
        'task_description': 'cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dyann Pardi',
        'email': 'dpardidc@cargocollective.com',
        'company_name': 'Mita',
        'task_date': '2022-09-23',
        'task_description': 'ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Randee Burston',
        'email': 'rburstondd@nymag.com',
        'company_name': 'Kazu',
        'task_date': '2022-06-24',
        'task_description': 'commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Madge Gaythwaite',
        'email': 'mgaythwaitede@amazon.de',
        'company_name': 'Rhynyx',
        'task_date': '2022-09-15',
        'task_description': 'in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Manolo Oaten',
        'email': 'moatendf@seesaa.net',
        'company_name': 'Shufflester',
        'task_date': '2022-02-10',
        'task_description': 'vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Morey Tommasetti',
        'email': 'mtommasettidg@wired.com',
        'company_name': 'Bubblebox',
        'task_date': '2022-10-28',
        'task_description': 'commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kaile Scheffler',
        'email': 'kschefflerdh@discuz.net',
        'company_name': 'Roombo',
        'task_date': '2021-12-16',
        'task_description': 'eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Karleen Von Welden',
        'email': 'kvondi@surveymonkey.com',
        'company_name': 'Demimbu',
        'task_date': '2021-12-08',
        'task_description': 'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Tobias Spillman',
        'email': 'tspillmandj@reuters.com',
        'company_name': 'Photospace',
        'task_date': '2022-03-11',
        'task_description': 'velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Judy Hagan',
        'email': 'jhagandk@stanford.edu',
        'company_name': 'Photospace',
        'task_date': '2022-06-29',
        'task_description': 'sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lorenzo Baptista',
        'email': 'lbaptistadl@webnode.com',
        'company_name': 'Ntags',
        'task_date': '2022-05-03',
        'task_description': 'justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Leonelle Weymont',
        'email': 'lweymontdm@uiuc.edu',
        'company_name': 'Thoughtbridge',
        'task_date': '2022-07-11',
        'task_description': 'in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ellynn Davage',
        'email': 'edavagedn@ox.ac.uk',
        'company_name': 'Viva',
        'task_date': '2022-05-24',
        'task_description': 'at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lucky Footer',
        'email': 'lfooterdo@twitter.com',
        'company_name': 'Voonyx',
        'task_date': '2022-01-20',
        'task_description': 'sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Michail Pirrey',
        'email': 'mpirreydp@addtoany.com',
        'company_name': 'Cogibox',
        'task_date': '2022-11-12',
        'task_description': 'platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lena Faragan',
        'email': 'lfaragandq@miitbeian.gov.cn',
        'company_name': 'Quatz',
        'task_date': '2022-06-12',
        'task_description': 'amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Izzy O\'Nowlan',
        'email': 'ionowlandr@mapy.cz',
        'company_name': 'Meevee',
        'task_date': '2022-05-05',
        'task_description': 'tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Emlynne Bachura',
        'email': 'ebachurads@tuttocitta.it',
        'company_name': 'Abata',
        'task_date': '2022-07-27',
        'task_description': 'hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Joan Divis',
        'email': 'jdivisdt@yahoo.com',
        'company_name': 'Eare',
        'task_date': '2022-10-26',
        'task_description': 'elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Pate Patience',
        'email': 'ppatiencedu@yellowbook.com',
        'company_name': 'Jabbersphere',
        'task_date': '2022-05-13',
        'task_description': 'id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Freddy Baford',
        'email': 'fbaforddv@elpais.com',
        'company_name': 'Demimbu',
        'task_date': '2022-07-25',
        'task_description': 'suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Benjamen Ernke',
        'email': 'bernkedw@blogger.com',
        'company_name': 'Dabjam',
        'task_date': '2022-07-30',
        'task_description': 'diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Pavla Adamou',
        'email': 'padamoudx@seesaa.net',
        'company_name': 'Twimbo',
        'task_date': '2021-12-21',
        'task_description': 'dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lauralee Croy',
        'email': 'lcroydy@bbb.org',
        'company_name': 'Edgeclub',
        'task_date': '2022-09-04',
        'task_description': 'nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Garrett Zealy',
        'email': 'gzealydz@cpanel.net',
        'company_name': 'Gigazoom',
        'task_date': '2021-11-28',
        'task_description': 'sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Joyann Ellcock',
        'email': 'jellcocke0@addtoany.com',
        'company_name': 'Dazzlesphere',
        'task_date': '2022-03-21',
        'task_description': 'integer pede justo lacinia eget tincidunt eget tempus vel pede',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Leslie McEnhill',
        'email': 'lmcenhille1@comcast.net',
        'company_name': 'Camimbo',
        'task_date': '2021-12-09',
        'task_description': 'neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Novelia Dougan',
        'email': 'ndougane2@oakley.com',
        'company_name': 'Mydo',
        'task_date': '2022-05-16',
        'task_description': 'massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Urbanus Gerrad',
        'email': 'ugerrade3@sciencedirect.com',
        'company_name': 'Viva',
        'task_date': '2021-12-31',
        'task_description': 'sed ante vivamus tortor duis mattis egestas metus aenean fermentum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lennie Shead',
        'email': 'lsheade4@reference.com',
        'company_name': 'Youspan',
        'task_date': '2022-10-16',
        'task_description': 'ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Aluino Mixhel',
        'email': 'amixhele5@jalbum.net',
        'company_name': 'LiveZ',
        'task_date': '2022-07-23',
        'task_description': 'faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alvis Cowern',
        'email': 'acowerne6@google.com',
        'company_name': 'Kamba',
        'task_date': '2022-07-02',
        'task_description': 'turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alistair Columbine',
        'email': 'acolumbinee7@washington.edu',
        'company_name': 'Yodoo',
        'task_date': '2022-09-01',
        'task_description': 'sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lidia Maryman',
        'email': 'lmarymane8@cam.ac.uk',
        'company_name': 'Bubblebox',
        'task_date': '2022-03-06',
        'task_description': 'nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Doreen Pitcaithly',
        'email': 'dpitcaithlye9@census.gov',
        'company_name': 'Babblestorm',
        'task_date': '2022-01-10',
        'task_description': 'at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cathryn Swafield',
        'email': 'cswafieldea@samsung.com',
        'company_name': 'Yodel',
        'task_date': '2022-04-03',
        'task_description': 'mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gustavo Shipman',
        'email': 'gshipmaneb@princeton.edu',
        'company_name': 'Trupe',
        'task_date': '2022-05-29',
        'task_description': 'orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Temp Newark',
        'email': 'tnewarkec@parallels.com',
        'company_name': 'Topiczoom',
        'task_date': '2022-02-01',
        'task_description': 'lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Deborah Miguet',
        'email': 'dmigueted@hugedomains.com',
        'company_name': 'Skyble',
        'task_date': '2021-11-28',
        'task_description': 'sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kym Silcock',
        'email': 'ksilcockee@google.ru',
        'company_name': 'Quamba',
        'task_date': '2022-09-04',
        'task_description': 'elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Aldis Langdon',
        'email': 'alangdonef@cloudflare.com',
        'company_name': 'Fliptune',
        'task_date': '2022-05-10',
        'task_description': 'nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Alonso Quinet',
        'email': 'aquineteg@wordpress.org',
        'company_name': 'Skipstorm',
        'task_date': '2022-01-13',
        'task_description': 'turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Igor Mattys',
        'email': 'imattyseh@merriam-webster.com',
        'company_name': 'Quire',
        'task_date': '2022-07-28',
        'task_description': 'mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Axe Imesen',
        'email': 'aimesenei@rambler.ru',
        'company_name': 'Wordtune',
        'task_date': '2022-01-07',
        'task_description': 'turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Siffre Wallege',
        'email': 'swallegeej@youtu.be',
        'company_name': 'Trudoo',
        'task_date': '2022-09-30',
        'task_description': 'orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Roseanna Hatfield',
        'email': 'rhatfieldek@gov.uk',
        'company_name': 'Rhynyx',
        'task_date': '2022-08-14',
        'task_description': 'praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ken Shakelade',
        'email': 'kshakeladeel@hexun.com',
        'company_name': 'Mydeo',
        'task_date': '2022-02-18',
        'task_description': 'iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kahaleel Chidley',
        'email': 'kchidleyem@engadget.com',
        'company_name': 'Ntags',
        'task_date': '2022-03-11',
        'task_description': 'ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Isadore Lates',
        'email': 'ilatesen@bigcartel.com',
        'company_name': 'Quimm',
        'task_date': '2022-03-02',
        'task_description': 'sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ingrid Geoghegan',
        'email': 'igeogheganeo@washington.edu',
        'company_name': 'Kwideo',
        'task_date': '2022-06-25',
        'task_description': 'dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alanna Atkinson',
        'email': 'aatkinsonep@jimdo.com',
        'company_name': 'Skynoodle',
        'task_date': '2022-05-12',
        'task_description': 'in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Barny Lindborg',
        'email': 'blindborgeq@guardian.co.uk',
        'company_name': 'Vinte',
        'task_date': '2022-06-17',
        'task_description': 'volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Gill Docharty',
        'email': 'gdochartyer@abc.net.au',
        'company_name': 'Devpulse',
        'task_date': '2022-04-07',
        'task_description': 'nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Hendrika Flott',
        'email': 'hflottes@cpanel.net',
        'company_name': 'Katz',
        'task_date': '2022-10-03',
        'task_description': 'justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kathye Gommery',
        'email': 'kgommeryet@instagram.com',
        'company_name': 'Trilia',
        'task_date': '2022-08-22',
        'task_description': 'in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Renado Hawford',
        'email': 'rhawfordeu@desdev.cn',
        'company_name': 'Jaxbean',
        'task_date': '2022-07-07',
        'task_description': 'erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Reinaldos Pudner',
        'email': 'rpudnerev@delicious.com',
        'company_name': 'Mynte',
        'task_date': '2022-11-13',
        'task_description': 'metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Caprice Kornes',
        'email': 'ckornesew@last.fm',
        'company_name': 'Zoomcast',
        'task_date': '2022-07-06',
        'task_description': 'luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Doreen Burcombe',
        'email': 'dburcombeex@indiegogo.com',
        'company_name': 'Snaptags',
        'task_date': '2022-02-12',
        'task_description': 'potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Jeffie Cawsy',
        'email': 'jcawsyey@unicef.org',
        'company_name': 'Jatri',
        'task_date': '2022-09-11',
        'task_description': 'hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Zachariah Rawcliff',
        'email': 'zrawcliffez@whitehouse.gov',
        'company_name': 'Digitube',
        'task_date': '2021-11-24',
        'task_description': 'sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Addia Ivanilov',
        'email': 'aivanilovf0@princeton.edu',
        'company_name': 'Skiptube',
        'task_date': '2022-10-28',
        'task_description': 'convallis morbi odio odio elementum eu interdum eu tincidunt in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Leigha Buckthorpe',
        'email': 'lbuckthorpef1@dailymotion.com',
        'company_name': 'Yacero',
        'task_date': '2022-08-24',
        'task_description': 'vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lib Lippini',
        'email': 'llippinif2@accuweather.com',
        'company_name': 'Browseblab',
        'task_date': '2022-09-15',
        'task_description': 'pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Mari Stuke',
        'email': 'mstukef3@adobe.com',
        'company_name': 'Livepath',
        'task_date': '2022-03-02',
        'task_description': 'arcu sed augue aliquam erat volutpat in congue etiam justo etiam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lizbeth McCaw',
        'email': 'lmccawf4@gravatar.com',
        'company_name': 'Devshare',
        'task_date': '2022-03-25',
        'task_description': 'magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Phillie Prudham',
        'email': 'pprudhamf5@cloudflare.com',
        'company_name': 'Twitterbridge',
        'task_date': '2022-09-08',
        'task_description': 'et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Marti Peschet',
        'email': 'mpeschetf6@java.com',
        'company_name': 'Yodoo',
        'task_date': '2022-07-27',
        'task_description': 'ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ediva Neild',
        'email': 'eneildf7@rambler.ru',
        'company_name': 'Trilith',
        'task_date': '2022-10-27',
        'task_description': 'tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Weider Balser',
        'email': 'wbalserf8@mysql.com',
        'company_name': 'Centizu',
        'task_date': '2022-05-02',
        'task_description': 'nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Leeann Holston',
        'email': 'lholstonf9@comcast.net',
        'company_name': 'Gigashots',
        'task_date': '2022-01-29',
        'task_description': 'morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Carrissa Bohje',
        'email': 'cbohjefa@symantec.com',
        'company_name': 'Nlounge',
        'task_date': '2022-01-04',
        'task_description': 'sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lexie Sperring',
        'email': 'lsperringfb@blogtalkradio.com',
        'company_name': 'Skipfire',
        'task_date': '2021-12-04',
        'task_description': 'aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alexio Scotter',
        'email': 'ascotterfc@tmall.com',
        'company_name': 'Buzzster',
        'task_date': '2022-07-14',
        'task_description': 'elementum nullam varius nulla facilisi cras non velit nec nisi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Stanford Durbyn',
        'email': 'sdurbynfd@blinklist.com',
        'company_name': 'Brightdog',
        'task_date': '2022-10-03',
        'task_description': 'magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Loralyn Govinlock',
        'email': 'lgovinlockfe@hp.com',
        'company_name': 'Omba',
        'task_date': '2022-06-27',
        'task_description': 'vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Reta Fairy',
        'email': 'rfairyff@yale.edu',
        'company_name': 'Skyndu',
        'task_date': '2022-06-17',
        'task_description': 'auctor sed tristique in tempus sit amet sem fusce consequat nulla',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Camille Keford',
        'email': 'ckefordfg@t-online.de',
        'company_name': 'Thoughtmix',
        'task_date': '2021-12-12',
        'task_description': 'lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Estell Ballaam',
        'email': 'eballaamfh@amazon.co.uk',
        'company_name': 'Kimia',
        'task_date': '2022-05-10',
        'task_description': 'rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Wynnie Wicks',
        'email': 'wwicksfi@altervista.org',
        'company_name': 'Zoomcast',
        'task_date': '2022-10-08',
        'task_description': 'accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Barbe Sparsholt',
        'email': 'bsparsholtfj@artisteer.com',
        'company_name': 'Leenti',
        'task_date': '2022-05-25',
        'task_description': 'purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cyrille Legh',
        'email': 'cleghfk@theatlantic.com',
        'company_name': 'Skiba',
        'task_date': '2022-07-13',
        'task_description': 'in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Tabor Fitchew',
        'email': 'tfitchewfl@biblegateway.com',
        'company_name': 'Jetwire',
        'task_date': '2021-12-28',
        'task_description': 'sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Bram Smallman',
        'email': 'bsmallmanfm@weibo.com',
        'company_name': 'Jabbertype',
        'task_date': '2021-11-16',
        'task_description': 'blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Tarah Schneidar',
        'email': 'tschneidarfn@google.pl',
        'company_name': 'Rhyzio',
        'task_date': '2021-12-31',
        'task_description': 'consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Adore Webland',
        'email': 'aweblandfo@arstechnica.com',
        'company_name': 'Trilith',
        'task_date': '2022-06-18',
        'task_description': 'sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Miller Verbeek',
        'email': 'mverbeekfp@dropbox.com',
        'company_name': 'Zazio',
        'task_date': '2021-12-21',
        'task_description': 'et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bink Buxcy',
        'email': 'bbuxcyfq@walmart.com',
        'company_name': 'Feedspan',
        'task_date': '2022-08-14',
        'task_description': 'nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lukas Vigors',
        'email': 'lvigorsfr@clickbank.net',
        'company_name': 'Blogtags',
        'task_date': '2022-03-22',
        'task_description': 'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sybyl Talbot',
        'email': 'stalbotfs@weather.com',
        'company_name': 'Kwideo',
        'task_date': '2022-08-13',
        'task_description': 'ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Paolina Simonard',
        'email': 'psimonardft@reddit.com',
        'company_name': 'Vitz',
        'task_date': '2021-11-23',
        'task_description': 'duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Cheston Earie',
        'email': 'ceariefu@vinaora.com',
        'company_name': 'Wikivu',
        'task_date': '2022-07-29',
        'task_description': 'aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Carter Rawcliffe',
        'email': 'crawcliffefv@samsung.com',
        'company_name': 'Yakijo',
        'task_date': '2022-04-04',
        'task_description': 'libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Brynne Lind',
        'email': 'blindfw@w3.org',
        'company_name': 'Dablist',
        'task_date': '2022-04-12',
        'task_description': 'dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Halimeda Wroth',
        'email': 'hwrothfx@mit.edu',
        'company_name': 'Skinix',
        'task_date': '2022-02-06',
        'task_description': 'nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Keslie Vautrey',
        'email': 'kvautreyfy@sphinn.com',
        'company_name': 'Youfeed',
        'task_date': '2022-01-05',
        'task_description': 'in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Margarete Gellier',
        'email': 'mgellierfz@1688.com',
        'company_name': 'Dynazzy',
        'task_date': '2022-03-19',
        'task_description': 'aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Giuseppe Gipp',
        'email': 'ggippg0@apache.org',
        'company_name': 'Youspan',
        'task_date': '2022-05-04',
        'task_description': 'ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jesse Peattie',
        'email': 'jpeattieg1@redcross.org',
        'company_name': 'Thoughtbridge',
        'task_date': '2022-06-26',
        'task_description': 'diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Haslett Quantick',
        'email': 'hquantickg2@symantec.com',
        'company_name': 'Mymm',
        'task_date': '2022-01-06',
        'task_description': 'ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Jodi Forth',
        'email': 'jforthg3@fda.gov',
        'company_name': 'Wordify',
        'task_date': '2022-11-02',
        'task_description': 'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Steffi Armitt',
        'email': 'sarmittg4@jiathis.com',
        'company_name': 'Tagchat',
        'task_date': '2022-05-14',
        'task_description': 'sit amet consectetuer adipiscing elit proin interdum mauris non ligula',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Allissa Woodthorpe',
        'email': 'awoodthorpeg5@webmd.com',
        'company_name': 'Rhynoodle',
        'task_date': '2022-10-20',
        'task_description': 'etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Oberon Janota',
        'email': 'ojanotag6@kickstarter.com',
        'company_name': 'Shuffledrive',
        'task_date': '2022-07-01',
        'task_description': 'nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Rollin Pauli',
        'email': 'rpaulig7@forbes.com',
        'company_name': 'Dabjam',
        'task_date': '2022-06-25',
        'task_description': 'aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Leontine Cannam',
        'email': 'lcannamg8@geocities.jp',
        'company_name': 'Realpoint',
        'task_date': '2021-11-19',
        'task_description': 'donec diam neque vestibulum eget vulputate ut ultrices vel augue',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Isadore Cathrall',
        'email': 'icathrallg9@usnews.com',
        'company_name': 'Twitterworks',
        'task_date': '2022-07-03',
        'task_description': 'metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ira Chazelle',
        'email': 'ichazellega@typepad.com',
        'company_name': 'Wikivu',
        'task_date': '2022-04-30',
        'task_description': 'at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Amabelle Clash',
        'email': 'aclashgb@google.com.au',
        'company_name': 'Yodoo',
        'task_date': '2022-02-20',
        'task_description': 'pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lillian Cohane',
        'email': 'lcohanegc@tuttocitta.it',
        'company_name': 'Twitterbridge',
        'task_date': '2022-11-10',
        'task_description': 'ligula in lacus curabitur at ipsum ac tellus semper interdum mauris',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Alexandros De Rechter',
        'email': 'adegd@rediff.com',
        'company_name': 'Flipopia',
        'task_date': '2022-02-26',
        'task_description': 'ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Wynny De Biaggi',
        'email': 'wdege@tamu.edu',
        'company_name': 'Brainverse',
        'task_date': '2022-04-22',
        'task_description': 'amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Gennifer Bernardini',
        'email': 'gbernardinigf@bandcamp.com',
        'company_name': 'Edgewire',
        'task_date': '2022-11-05',
        'task_description': 'morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Rica Griffin',
        'email': 'rgriffingg@opensource.org',
        'company_name': 'Thoughtmix',
        'task_date': '2021-11-29',
        'task_description': 'at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Mitzi Pirouet',
        'email': 'mpirouetgh@psu.edu',
        'company_name': 'Realbuzz',
        'task_date': '2022-07-25',
        'task_description': 'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Graehme Jouaneton',
        'email': 'gjouanetongi@utexas.edu',
        'company_name': 'Kamba',
        'task_date': '2022-07-13',
        'task_description': 'justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Olivero Gwinnel',
        'email': 'ogwinnelgj@nytimes.com',
        'company_name': 'Gigazoom',
        'task_date': '2022-09-26',
        'task_description': 'vestibulum velit id pretium iaculis diam erat fermentum justo nec',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Nicolina Gresham',
        'email': 'ngreshamgk@rakuten.co.jp',
        'company_name': 'Ozu',
        'task_date': '2021-12-18',
        'task_description': 'viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sidney Sisselot',
        'email': 'ssisselotgl@geocities.jp',
        'company_name': 'Skibox',
        'task_date': '2021-12-30',
        'task_description': 'cum sociis natoque penatibus et magnis dis parturient montes nascetur',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Forester Bean',
        'email': 'fbeangm@netscape.com',
        'company_name': 'Zoombox',
        'task_date': '2022-01-13',
        'task_description': 'rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Chevalier Jecock',
        'email': 'cjecockgn@blogtalkradio.com',
        'company_name': 'Rhyzio',
        'task_date': '2022-08-26',
        'task_description': 'ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Hallsy Davsley',
        'email': 'hdavsleygo@free.fr',
        'company_name': 'Edgeify',
        'task_date': '2021-11-27',
        'task_description': 'ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Cris Yeskin',
        'email': 'cyeskingp@youtube.com',
        'company_name': 'Twimbo',
        'task_date': '2022-03-31',
        'task_description': 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kin Igglesden',
        'email': 'kigglesdengq@altervista.org',
        'company_name': 'Realpoint',
        'task_date': '2022-10-20',
        'task_description': 'ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kenton McNae',
        'email': 'kmcnaegr@cmu.edu',
        'company_name': 'Flipstorm',
        'task_date': '2022-08-23',
        'task_description': 'suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nickie Lukesch',
        'email': 'nlukeschgs@infoseek.co.jp',
        'company_name': 'Skalith',
        'task_date': '2022-03-25',
        'task_description': 'ac diam cras pellentesque volutpat dui maecenas tristique est et',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lazare Merck',
        'email': 'lmerckgt@google.it',
        'company_name': 'Jaloo',
        'task_date': '2022-05-04',
        'task_description': 'et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Regine Townes',
        'email': 'rtownesgu@indiegogo.com',
        'company_name': 'Kayveo',
        'task_date': '2022-05-11',
        'task_description': 'luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Dalis Farron',
        'email': 'dfarrongv@ustream.tv',
        'company_name': 'Buzzster',
        'task_date': '2022-03-14',
        'task_description': 'amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cathie Pervew',
        'email': 'cpervewgw@scientificamerican.com',
        'company_name': 'Twitternation',
        'task_date': '2021-12-05',
        'task_description': 'rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Leonora Cunnell',
        'email': 'lcunnellgx@whitehouse.gov',
        'company_name': 'Wikizz',
        'task_date': '2022-08-26',
        'task_description': 'cursus id turpis integer aliquet massa id lobortis convallis tortor risus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alisander Haymes',
        'email': 'ahaymesgy@alibaba.com',
        'company_name': 'Quinu',
        'task_date': '2022-09-13',
        'task_description': 'eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Rodrigo Andric',
        'email': 'randricgz@usa.gov',
        'company_name': 'Quimm',
        'task_date': '2022-04-29',
        'task_description': 'cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Clovis Ferreli',
        'email': 'cferrelih0@cbslocal.com',
        'company_name': 'Jabberstorm',
        'task_date': '2022-11-10',
        'task_description': 'leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Web Coward',
        'email': 'wcowardh1@salon.com',
        'company_name': 'Camimbo',
        'task_date': '2021-12-01',
        'task_description': 'primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gearard McWaters',
        'email': 'gmcwatersh2@webs.com',
        'company_name': 'Twitterlist',
        'task_date': '2022-04-24',
        'task_description': 'bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kacey Tossell',
        'email': 'ktossellh3@com.com',
        'company_name': 'Shufflebeat',
        'task_date': '2022-07-06',
        'task_description': 'dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Felicdad Huelin',
        'email': 'fhuelinh4@illinois.edu',
        'company_name': 'Flashdog',
        'task_date': '2022-06-24',
        'task_description': 'augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Keriann Percy',
        'email': 'kpercyh5@apache.org',
        'company_name': 'Oyondu',
        'task_date': '2021-11-27',
        'task_description': 'est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nelly Sudron',
        'email': 'nsudronh6@wiley.com',
        'company_name': 'Oozz',
        'task_date': '2022-01-15',
        'task_description': 'a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Finlay Gammage',
        'email': 'fgammageh7@etsy.com',
        'company_name': 'Omba',
        'task_date': '2022-10-14',
        'task_description': 'magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Goddart Leebeter',
        'email': 'gleebeterh8@slate.com',
        'company_name': 'Jabbersphere',
        'task_date': '2022-11-01',
        'task_description': 'eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Issi Mattioni',
        'email': 'imattionih9@bandcamp.com',
        'company_name': 'Mydeo',
        'task_date': '2022-05-15',
        'task_description': 'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Clementius Credland',
        'email': 'ccredlandha@nyu.edu',
        'company_name': 'Realbridge',
        'task_date': '2022-08-20',
        'task_description': 'pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Hillery Josephsen',
        'email': 'hjosephsenhb@netvibes.com',
        'company_name': 'Chatterbridge',
        'task_date': '2022-05-29',
        'task_description': 'bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lorianna Prinnett',
        'email': 'lprinnetthc@netlog.com',
        'company_name': 'Flashset',
        'task_date': '2022-03-01',
        'task_description': 'mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Hazel Merkle',
        'email': 'hmerklehd@taobao.com',
        'company_name': 'Bluezoom',
        'task_date': '2022-09-03',
        'task_description': 'sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Marley Simakov',
        'email': 'msimakovhe@ezinearticles.com',
        'company_name': 'Fivebridge',
        'task_date': '2022-01-17',
        'task_description': 'sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Staci Rathbourne',
        'email': 'srathbournehf@elpais.com',
        'company_name': 'Quire',
        'task_date': '2022-09-08',
        'task_description': 'eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dana Noice',
        'email': 'dnoicehg@stanford.edu',
        'company_name': 'Zazio',
        'task_date': '2022-05-08',
        'task_description': 'proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Humfrid Reynault',
        'email': 'hreynaulthh@sphinn.com',
        'company_name': 'Dynava',
        'task_date': '2021-12-06',
        'task_description': 'pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Regina Kembrey',
        'email': 'rkembreyhi@wiley.com',
        'company_name': 'Browsezoom',
        'task_date': '2022-10-14',
        'task_description': 'at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Deva Pridding',
        'email': 'dpriddinghj@ucoz.ru',
        'company_name': 'Tagpad',
        'task_date': '2022-01-30',
        'task_description': 'nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Loralie Yatman',
        'email': 'lyatmanhk@tuttocitta.it',
        'company_name': 'Leexo',
        'task_date': '2022-10-09',
        'task_description': 'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kevyn Harse',
        'email': 'kharsehl@guardian.co.uk',
        'company_name': 'Youfeed',
        'task_date': '2022-04-09',
        'task_description': 'ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Devin Tobin',
        'email': 'dtobinhm@nyu.edu',
        'company_name': 'Photobug',
        'task_date': '2022-11-09',
        'task_description': 'molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Anetta Creus',
        'email': 'acreushn@woothemes.com',
        'company_name': 'Rhyzio',
        'task_date': '2021-12-01',
        'task_description': 'nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Basia Gemmill',
        'email': 'bgemmillho@hao123.com',
        'company_name': 'Camimbo',
        'task_date': '2022-01-19',
        'task_description': 'volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Matthaeus Towsey',
        'email': 'mtowseyhp@usgs.gov',
        'company_name': 'Tagfeed',
        'task_date': '2022-02-15',
        'task_description': 'leo odio porttitor id consequat in consequat ut nulla sed accumsan',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Garry Greenway',
        'email': 'ggreenwayhq@amazon.de',
        'company_name': 'Eimbee',
        'task_date': '2022-03-30',
        'task_description': 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rafa Eustis',
        'email': 'reustishr@chronoengine.com',
        'company_name': 'Youfeed',
        'task_date': '2022-06-05',
        'task_description': 'id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Yorke Thorbon',
        'email': 'ythorbonhs@moonfruit.com',
        'company_name': 'Twitterlist',
        'task_date': '2022-01-03',
        'task_description': 'consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rycca Gustus',
        'email': 'rgustusht@i2i.jp',
        'company_name': 'Gigaclub',
        'task_date': '2022-03-08',
        'task_description': 'orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Calvin Treuge',
        'email': 'ctreugehu@ning.com',
        'company_name': 'Realfire',
        'task_date': '2022-01-01',
        'task_description': 'maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Danni Tilte',
        'email': 'dtiltehv@cisco.com',
        'company_name': 'Eazzy',
        'task_date': '2021-12-06',
        'task_description': 'suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Bank Dunkerly',
        'email': 'bdunkerlyhw@usnews.com',
        'company_name': 'Skivee',
        'task_date': '2022-11-04',
        'task_description': 'luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Mead Stuchberry',
        'email': 'mstuchberryhx@fc2.com',
        'company_name': 'Kwideo',
        'task_date': '2022-10-26',
        'task_description': 'donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bernardo Sydry',
        'email': 'bsydryhy@wordpress.org',
        'company_name': 'Gigabox',
        'task_date': '2022-07-19',
        'task_description': 'vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Norbie Maskall',
        'email': 'nmaskallhz@goo.gl',
        'company_name': 'Brainsphere',
        'task_date': '2021-12-20',
        'task_description': 'nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gillan Le Monnier',
        'email': 'glei0@gizmodo.com',
        'company_name': 'Riffwire',
        'task_date': '2022-04-11',
        'task_description': 'magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Garvin Birkenshaw',
        'email': 'gbirkenshawi1@wordpress.com',
        'company_name': 'Midel',
        'task_date': '2022-08-15',
        'task_description': 'nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Mariam Soame',
        'email': 'msoamei2@cbslocal.com',
        'company_name': 'Skyble',
        'task_date': '2022-07-03',
        'task_description': 'primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bondon Othick',
        'email': 'bothicki3@github.io',
        'company_name': 'Zazio',
        'task_date': '2022-08-22',
        'task_description': 'nullam porttitor lacus at turpis donec posuere metus vitae ipsum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Genna Droghan',
        'email': 'gdroghani4@army.mil',
        'company_name': 'Buzzdog',
        'task_date': '2022-06-28',
        'task_description': 'in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Annamaria Steaning',
        'email': 'asteaningi5@blogger.com',
        'company_name': 'Voonder',
        'task_date': '2021-11-23',
        'task_description': 'vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Erwin Cansdall',
        'email': 'ecansdalli6@earthlink.net',
        'company_name': 'Dynazzy',
        'task_date': '2022-07-08',
        'task_description': 'felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bonnee Yushkov',
        'email': 'byushkovi7@people.com.cn',
        'company_name': 'Skidoo',
        'task_date': '2022-08-18',
        'task_description': 'lorem ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Clo Wilks',
        'email': 'cwilksi8@linkedin.com',
        'company_name': 'Ailane',
        'task_date': '2022-04-10',
        'task_description': 'et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Bernita Meek',
        'email': 'bmeeki9@admin.ch',
        'company_name': 'Dabtype',
        'task_date': '2022-02-07',
        'task_description': 'vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Carol-jean Marcombe',
        'email': 'cmarcombeia@nationalgeographic.com',
        'company_name': 'Yodoo',
        'task_date': '2022-07-01',
        'task_description': 'vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Wileen Allewell',
        'email': 'wallewellib@mtv.com',
        'company_name': 'Trupe',
        'task_date': '2022-11-07',
        'task_description': 'praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Aimil MacMeanma',
        'email': 'amacmeanmaic@spotify.com',
        'company_name': 'Aivee',
        'task_date': '2022-09-24',
        'task_description': 'non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Marrilee Falck',
        'email': 'mfalckid@woothemes.com',
        'company_name': 'Tanoodle',
        'task_date': '2022-04-04',
        'task_description': 'nulla nunc purus phasellus in felis donec semper sapien a libero nam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Mickie Chell',
        'email': 'mchellie@freewebs.com',
        'company_name': 'Muxo',
        'task_date': '2022-08-18',
        'task_description': 'eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nolana Flipek',
        'email': 'nflipekif@rambler.ru',
        'company_name': 'Eayo',
        'task_date': '2021-12-03',
        'task_description': 'mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Robenia Lobell',
        'email': 'rlobellig@arizona.edu',
        'company_name': 'Zoovu',
        'task_date': '2022-02-03',
        'task_description': 'sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Joshuah Syers',
        'email': 'jsyersih@usatoday.com',
        'company_name': 'Fadeo',
        'task_date': '2022-02-20',
        'task_description': 'vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Christiana Ettridge',
        'email': 'cettridgeii@skyrock.com',
        'company_name': 'Twitterlist',
        'task_date': '2022-10-17',
        'task_description': 'sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Shelley Outerbridge',
        'email': 'souterbridgeij@163.com',
        'company_name': 'Jatri',
        'task_date': '2022-01-26',
        'task_description': 'odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kessiah Dericot',
        'email': 'kdericotik@aol.com',
        'company_name': 'Talane',
        'task_date': '2022-06-28',
        'task_description': 'velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Eydie MacDonell',
        'email': 'emacdonellil@nymag.com',
        'company_name': 'Lazz',
        'task_date': '2021-11-14',
        'task_description': 'ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Adel Lead',
        'email': 'aleadim@delicious.com',
        'company_name': 'Roodel',
        'task_date': '2022-10-28',
        'task_description': 'hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Teddy Corbould',
        'email': 'tcorbouldin@ow.ly',
        'company_name': 'Livetube',
        'task_date': '2022-09-30',
        'task_description': 'cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Carolan Norfolk',
        'email': 'cnorfolkio@addtoany.com',
        'company_name': 'Jaloo',
        'task_date': '2022-06-22',
        'task_description': 'elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Coriss Dran',
        'email': 'cdranip@adobe.com',
        'company_name': 'Eayo',
        'task_date': '2022-03-23',
        'task_description': 'vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Daryl Hinken',
        'email': 'dhinkeniq@marketwatch.com',
        'company_name': 'Eadel',
        'task_date': '2021-12-26',
        'task_description': 'est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Reinaldo Duffree',
        'email': 'rduffreeir@privacy.gov.au',
        'company_name': 'Twimm',
        'task_date': '2022-03-02',
        'task_description': 'justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Florella Sharville',
        'email': 'fsharvilleis@vimeo.com',
        'company_name': 'Edgeclub',
        'task_date': '2022-10-22',
        'task_description': 'nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Windham Camelin',
        'email': 'wcamelinit@addtoany.com',
        'company_name': 'Zoombeat',
        'task_date': '2022-03-19',
        'task_description': 'pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Avictor Blair',
        'email': 'ablairiu@goo.ne.jp',
        'company_name': 'Dablist',
        'task_date': '2022-03-24',
        'task_description': 'habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Delores Osler',
        'email': 'dosleriv@barnesandnoble.com',
        'company_name': 'Katz',
        'task_date': '2022-02-07',
        'task_description': 'sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lanita Elsie',
        'email': 'lelsieiw@mit.edu',
        'company_name': 'Flipbug',
        'task_date': '2022-01-31',
        'task_description': 'curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Laetitia Moroney',
        'email': 'lmoroneyix@netscape.com',
        'company_name': 'Lazzy',
        'task_date': '2022-06-09',
        'task_description': 'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Xavier Halgarth',
        'email': 'xhalgarthiy@hp.com',
        'company_name': 'Viva',
        'task_date': '2022-10-23',
        'task_description': 'elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Byron Cadogan',
        'email': 'bcadoganiz@sciencedirect.com',
        'company_name': 'Tazz',
        'task_date': '2022-10-10',
        'task_description': 'aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Walton Haysar',
        'email': 'whaysarj0@gov.uk',
        'company_name': 'Eimbee',
        'task_date': '2022-09-01',
        'task_description': 'diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Celesta Edwicke',
        'email': 'cedwickej1@hud.gov',
        'company_name': 'Yotz',
        'task_date': '2022-10-04',
        'task_description': 'aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kathleen Tongs',
        'email': 'ktongsj2@flavors.me',
        'company_name': 'Trupe',
        'task_date': '2022-07-31',
        'task_description': 'potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Armstrong Atte-Stone',
        'email': 'aattestonej3@scribd.com',
        'company_name': 'Skivee',
        'task_date': '2022-06-21',
        'task_description': 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Althea Cusick',
        'email': 'acusickj4@washingtonpost.com',
        'company_name': 'Zoovu',
        'task_date': '2022-01-19',
        'task_description': 'vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nico Cumberpatch',
        'email': 'ncumberpatchj5@wikimedia.org',
        'company_name': 'Skipstorm',
        'task_date': '2022-02-17',
        'task_description': 'nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Rollo Jakeman',
        'email': 'rjakemanj6@dailymail.co.uk',
        'company_name': 'Dynabox',
        'task_date': '2022-07-14',
        'task_description': 'eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Porty Pirrone',
        'email': 'ppirronej7@blogs.com',
        'company_name': 'Gabcube',
        'task_date': '2022-11-04',
        'task_description': 'massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bernardo Staresmeare',
        'email': 'bstaresmearej8@cmu.edu',
        'company_name': 'Yombu',
        'task_date': '2022-04-20',
        'task_description': 'magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Riannon Churchward',
        'email': 'rchurchwardj9@diigo.com',
        'company_name': 'Vinte',
        'task_date': '2022-07-11',
        'task_description': 'odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Clifford Finnes',
        'email': 'cfinnesja@liveinternet.ru',
        'company_name': 'Photospace',
        'task_date': '2021-12-04',
        'task_description': 'duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Julie Frostdick',
        'email': 'jfrostdickjb@blinklist.com',
        'company_name': 'Voolith',
        'task_date': '2022-07-07',
        'task_description': 'donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Maudie Massei',
        'email': 'mmasseijc@arstechnica.com',
        'company_name': 'Zoomdog',
        'task_date': '2022-06-09',
        'task_description': 'praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cello Tersay',
        'email': 'ctersayjd@imgur.com',
        'company_name': 'Yombu',
        'task_date': '2022-04-18',
        'task_description': 'fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lawrence Sorey',
        'email': 'lsoreyje@youtube.com',
        'company_name': 'Dynabox',
        'task_date': '2021-12-21',
        'task_description': 'vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Merlina Omond',
        'email': 'momondjf@hc360.com',
        'company_name': 'Babbleset',
        'task_date': '2022-08-17',
        'task_description': 'lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lani Pitkin',
        'email': 'lpitkinjg@networksolutions.com',
        'company_name': 'Zooxo',
        'task_date': '2022-02-25',
        'task_description': 'dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Mendy Rivlin',
        'email': 'mrivlinjh@rediff.com',
        'company_name': 'Devify',
        'task_date': '2021-12-28',
        'task_description': 'at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Tobye Greenstead',
        'email': 'tgreensteadji@symantec.com',
        'company_name': 'Abata',
        'task_date': '2022-03-02',
        'task_description': 'ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Etan Josowitz',
        'email': 'ejosowitzjj@vistaprint.com',
        'company_name': 'Jazzy',
        'task_date': '2022-01-06',
        'task_description': 'amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sherlock Smallthwaite',
        'email': 'ssmallthwaitejk@twitter.com',
        'company_name': 'Trudeo',
        'task_date': '2022-07-21',
        'task_description': 'sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Hendrika Averall',
        'email': 'haveralljl@mozilla.com',
        'company_name': 'Bubblemix',
        'task_date': '2022-08-02',
        'task_description': 'donec semper sapien a libero nam dui proin leo odio porttitor id',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Marja Paris',
        'email': 'mparisjm@ebay.co.uk',
        'company_name': 'Yombu',
        'task_date': '2022-11-07',
        'task_description': 'molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Maggee Bennike',
        'email': 'mbennikejn@bbb.org',
        'company_name': 'Wikizz',
        'task_date': '2022-07-08',
        'task_description': 'vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Aundrea Dollard',
        'email': 'adollardjo@scribd.com',
        'company_name': 'Twitterwire',
        'task_date': '2022-07-01',
        'task_description': 'odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Hercule Growy',
        'email': 'hgrowyjp@wix.com',
        'company_name': 'Realbridge',
        'task_date': '2022-06-22',
        'task_description': 'lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lezley Eustanch',
        'email': 'leustanchjq@vkontakte.ru',
        'company_name': 'Linktype',
        'task_date': '2022-03-13',
        'task_description': 'venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Athene Charley',
        'email': 'acharleyjr@wikispaces.com',
        'company_name': 'Ainyx',
        'task_date': '2022-06-10',
        'task_description': 'dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dyane Clethro',
        'email': 'dclethrojs@google.com',
        'company_name': 'Wordify',
        'task_date': '2022-07-22',
        'task_description': 'malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Arlyn Louca',
        'email': 'aloucajt@sun.com',
        'company_name': 'Abatz',
        'task_date': '2022-03-17',
        'task_description': 'sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Miguel Wass',
        'email': 'mwassju@posterous.com',
        'company_name': 'Zoonoodle',
        'task_date': '2022-01-11',
        'task_description': 'blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Vaughn Stainson',
        'email': 'vstainsonjv@nsw.gov.au',
        'company_name': 'Meejo',
        'task_date': '2022-11-13',
        'task_description': 'suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Louie Creyke',
        'email': 'lcreykejw@ycombinator.com',
        'company_name': 'Roodel',
        'task_date': '2021-12-13',
        'task_description': 'nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sybila Kersting',
        'email': 'skerstingjx@t.co',
        'company_name': 'Vipe',
        'task_date': '2022-03-31',
        'task_description': 'molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Godiva Caws',
        'email': 'gcawsjy@washingtonpost.com',
        'company_name': 'Tavu',
        'task_date': '2022-05-09',
        'task_description': 'odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Clarke Darter',
        'email': 'cdarterjz@indiegogo.com',
        'company_name': 'Brainsphere',
        'task_date': '2022-06-11',
        'task_description': 'in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Elvera Piletic',
        'email': 'epiletick0@homestead.com',
        'company_name': 'Voolith',
        'task_date': '2021-12-15',
        'task_description': 'nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lilith Frame',
        'email': 'lframek1@tuttocitta.it',
        'company_name': 'Buzzster',
        'task_date': '2022-11-10',
        'task_description': 'sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Thomasine Tiler',
        'email': 'ttilerk2@pinterest.com',
        'company_name': 'Flashpoint',
        'task_date': '2022-05-03',
        'task_description': 'justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'King Munroe',
        'email': 'kmunroek3@netlog.com',
        'company_name': 'Youtags',
        'task_date': '2021-12-06',
        'task_description': 'vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Francine Kersaw',
        'email': 'fkersawk4@sun.com',
        'company_name': 'Trilith',
        'task_date': '2021-12-06',
        'task_description': 'tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ibrahim MacInherney',
        'email': 'imacinherneyk5@jiathis.com',
        'company_name': 'Photolist',
        'task_date': '2022-07-25',
        'task_description': 'duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Berna Aishford',
        'email': 'baishfordk6@digg.com',
        'company_name': 'Tambee',
        'task_date': '2022-06-12',
        'task_description': 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Izabel Eplett',
        'email': 'ieplettk7@purevolume.com',
        'company_name': 'Tazzy',
        'task_date': '2022-03-19',
        'task_description': 'suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Giacobo Outerbridge',
        'email': 'gouterbridgek8@mashable.com',
        'company_name': 'Devpoint',
        'task_date': '2021-11-15',
        'task_description': 'pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Marshal Clemes',
        'email': 'mclemesk9@google.com',
        'company_name': 'Npath',
        'task_date': '2022-07-12',
        'task_description': 'elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Alic Wherry',
        'email': 'awherryka@google.co.jp',
        'company_name': 'Omba',
        'task_date': '2022-06-25',
        'task_description': 'pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Krissy Dallin',
        'email': 'kdallinkb@360.cn',
        'company_name': 'Browsecat',
        'task_date': '2022-09-12',
        'task_description': 'phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rossy Champerlen',
        'email': 'rchamperlenkc@cpanel.net',
        'company_name': 'Brainverse',
        'task_date': '2022-03-29',
        'task_description': 'dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Irene Slane',
        'email': 'islanekd@hubpages.com',
        'company_name': 'Dynabox',
        'task_date': '2022-04-28',
        'task_description': 'nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ricki Frankema',
        'email': 'rfrankemake@usa.gov',
        'company_name': 'Buzzshare',
        'task_date': '2022-06-03',
        'task_description': 'ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jeno Oak',
        'email': 'joakkf@hhs.gov',
        'company_name': 'Innojam',
        'task_date': '2022-02-12',
        'task_description': 'pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Dell Dank',
        'email': 'ddankkg@webeden.co.uk',
        'company_name': 'Eare',
        'task_date': '2022-01-14',
        'task_description': 'justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ranee Muldownie',
        'email': 'rmuldowniekh@about.me',
        'company_name': 'Jabbercube',
        'task_date': '2022-07-01',
        'task_description': 'nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Stefa Tring',
        'email': 'stringki@tinypic.com',
        'company_name': 'Skipfire',
        'task_date': '2021-12-31',
        'task_description': 'morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Niels Dowson',
        'email': 'ndowsonkj@mtv.com',
        'company_name': 'Bubbletube',
        'task_date': '2022-06-09',
        'task_description': 'venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Allie Gaspero',
        'email': 'agasperokk@yahoo.co.jp',
        'company_name': 'Skyble',
        'task_date': '2022-07-11',
        'task_description': 'pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Aguistin Tritten',
        'email': 'atrittenkl@scientificamerican.com',
        'company_name': 'Skiba',
        'task_date': '2022-06-23',
        'task_description': 'faucibus orci luctus et ultrices posuere cubilia curae donec pharetra',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Mechelle Mercer',
        'email': 'mmercerkm@un.org',
        'company_name': 'Layo',
        'task_date': '2022-03-01',
        'task_description': 'eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Demeter Beere',
        'email': 'dbeerekn@ebay.com',
        'company_name': 'Aivee',
        'task_date': '2022-07-21',
        'task_description': 'montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lucinda Oatley',
        'email': 'loatleyko@nature.com',
        'company_name': 'Gabvine',
        'task_date': '2022-06-16',
        'task_description': 'integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gilles Gerritsma',
        'email': 'ggerritsmakp@sohu.com',
        'company_name': 'Topiczoom',
        'task_date': '2022-06-30',
        'task_description': 'ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sandra Harget',
        'email': 'shargetkq@1und1.de',
        'company_name': 'Skyble',
        'task_date': '2022-01-23',
        'task_description': 'lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Wainwright Jakovijevic',
        'email': 'wjakovijevickr@nytimes.com',
        'company_name': 'Skalith',
        'task_date': '2022-01-03',
        'task_description': 'felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Eddi Piscopello',
        'email': 'episcopelloks@theatlantic.com',
        'company_name': 'InnoZ',
        'task_date': '2022-01-21',
        'task_description': 'nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Felicity Lantaff',
        'email': 'flantaffkt@dmoz.org',
        'company_name': 'Thoughtblab',
        'task_date': '2022-09-24',
        'task_description': 'non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Shermy Bratton',
        'email': 'sbrattonku@discovery.com',
        'company_name': 'Tagpad',
        'task_date': '2022-10-13',
        'task_description': 'lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lexie Harrie',
        'email': 'lharriekv@nih.gov',
        'company_name': 'Topiczoom',
        'task_date': '2022-10-21',
        'task_description': 'vestibulum quam sapien varius ut blandit non interdum in ante',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lilias Torricella',
        'email': 'ltorricellakw@ustream.tv',
        'company_name': 'Flashspan',
        'task_date': '2022-06-06',
        'task_description': 'eu orci mauris lacinia sapien quis libero nullam sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kristien Gingle',
        'email': 'kginglekx@bing.com',
        'company_name': 'Skippad',
        'task_date': '2022-09-07',
        'task_description': 'luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Conrade Corfield',
        'email': 'ccorfieldky@smh.com.au',
        'company_name': 'Feedbug',
        'task_date': '2021-11-21',
        'task_description': 'aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dana Killiner',
        'email': 'dkillinerkz@google.ru',
        'company_name': 'Fivechat',
        'task_date': '2021-12-20',
        'task_description': 'eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Monique Burchell',
        'email': 'mburchelll0@mac.com',
        'company_name': 'Gabtype',
        'task_date': '2022-08-10',
        'task_description': 'ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Porter Branni',
        'email': 'pbrannil1@abc.net.au',
        'company_name': 'Jaxnation',
        'task_date': '2022-09-07',
        'task_description': 'vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Noland Gothup',
        'email': 'ngothupl2@walmart.com',
        'company_name': 'Oba',
        'task_date': '2022-10-18',
        'task_description': 'orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Clemmy Jenik',
        'email': 'cjenikl3@joomla.org',
        'company_name': 'Twitterlist',
        'task_date': '2022-02-12',
        'task_description': 'aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Celestyn Barkhouse',
        'email': 'cbarkhousel4@businessweek.com',
        'company_name': 'Yambee',
        'task_date': '2022-02-15',
        'task_description': 'accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Zaria Fergie',
        'email': 'zfergiel5@stanford.edu',
        'company_name': 'Voomm',
        'task_date': '2022-05-30',
        'task_description': 'erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Antone Emmott',
        'email': 'aemmottl6@washington.edu',
        'company_name': 'Katz',
        'task_date': '2022-07-14',
        'task_description': 'nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Josh Faircliffe',
        'email': 'jfaircliffel7@barnesandnoble.com',
        'company_name': 'Voomm',
        'task_date': '2022-10-29',
        'task_description': 'pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Janka Van Merwe',
        'email': 'jvanl8@yale.edu',
        'company_name': 'Zoomdog',
        'task_date': '2022-08-27',
        'task_description': 'at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Juana Calrow',
        'email': 'jcalrowl9@va.gov',
        'company_name': 'Quimm',
        'task_date': '2022-08-06',
        'task_description': 'sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Joellyn Dakin',
        'email': 'jdakinla@ihg.com',
        'company_name': 'Fliptune',
        'task_date': '2022-01-21',
        'task_description': 'vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Filippo O\'Kenny',
        'email': 'fokennylb@sciencedaily.com',
        'company_name': 'Topicblab',
        'task_date': '2022-08-24',
        'task_description': 'donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Christean Nisco',
        'email': 'cniscolc@google.nl',
        'company_name': 'Meeveo',
        'task_date': '2022-09-19',
        'task_description': 'nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Mozelle Saurin',
        'email': 'msaurinld@businessweek.com',
        'company_name': 'Vipe',
        'task_date': '2021-11-22',
        'task_description': 'justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kitty Birkhead',
        'email': 'kbirkheadle@craigslist.org',
        'company_name': 'Babbleset',
        'task_date': '2022-03-22',
        'task_description': 'primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Lorne Lowrance',
        'email': 'llowrancelf@nasa.gov',
        'company_name': 'Blogtag',
        'task_date': '2022-03-15',
        'task_description': 'cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Janeczka Redmain',
        'email': 'jredmainlg@umn.edu',
        'company_name': 'Wikizz',
        'task_date': '2022-09-25',
        'task_description': 'a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Bern Blackwell',
        'email': 'bblackwelllh@nba.com',
        'company_name': 'Eimbee',
        'task_date': '2022-07-14',
        'task_description': 'curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Vasily Jachtym',
        'email': 'vjachtymli@wiley.com',
        'company_name': 'Browsebug',
        'task_date': '2022-09-27',
        'task_description': 'magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Farly Cordelette',
        'email': 'fcordelettelj@cloudflare.com',
        'company_name': 'Gigabox',
        'task_date': '2022-02-02',
        'task_description': 'malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Moreen Flowith',
        'email': 'mflowithlk@ox.ac.uk',
        'company_name': 'Jetpulse',
        'task_date': '2022-05-21',
        'task_description': 'metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Darrin Krates',
        'email': 'dkratesll@prlog.org',
        'company_name': 'Riffpath',
        'task_date': '2022-05-20',
        'task_description': 'congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Chrotoem Symes',
        'email': 'csymeslm@multiply.com',
        'company_name': 'Yozio',
        'task_date': '2022-11-02',
        'task_description': 'vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Elmo Hankard',
        'email': 'ehankardln@usgs.gov',
        'company_name': 'Digitube',
        'task_date': '2022-08-28',
        'task_description': 'convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Wayne Fouracres',
        'email': 'wfouracreslo@a8.net',
        'company_name': 'Yamia',
        'task_date': '2022-03-09',
        'task_description': 'odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nero Gilman',
        'email': 'ngilmanlp@sogou.com',
        'company_name': 'Shufflebeat',
        'task_date': '2022-03-17',
        'task_description': 'erat eros viverra eget congue eget semper rutrum nulla nunc purus',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Starla Burlingham',
        'email': 'sburlinghamlq@webs.com',
        'company_name': 'Mydeo',
        'task_date': '2022-05-12',
        'task_description': 'rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Davidde Sustins',
        'email': 'dsustinslr@engadget.com',
        'company_name': 'Eire',
        'task_date': '2022-07-03',
        'task_description': 'lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Elysia Broy',
        'email': 'ebroyls@ucla.edu',
        'company_name': 'Browsecat',
        'task_date': '2022-09-08',
        'task_description': 'morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Gerhard Grigorushkin',
        'email': 'ggrigorushkinlt@springer.com',
        'company_name': 'Rhynoodle',
        'task_date': '2022-03-30',
        'task_description': 'nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cynthie Chiddy',
        'email': 'cchiddylu@rediff.com',
        'company_name': 'Lazz',
        'task_date': '2022-10-07',
        'task_description': 'porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Denys Dury',
        'email': 'ddurylv@delicious.com',
        'company_name': 'Dynazzy',
        'task_date': '2021-12-07',
        'task_description': 'nunc proin at turpis a pede posuere nonummy integer non velit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Filberto Prozescky',
        'email': 'fprozesckylw@1688.com',
        'company_name': 'Eadel',
        'task_date': '2022-07-07',
        'task_description': 'eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kerby Fruen',
        'email': 'kfruenlx@unesco.org',
        'company_name': 'Riffpath',
        'task_date': '2022-06-07',
        'task_description': 'phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Celestyna Duiguid',
        'email': 'cduiguidly@theatlantic.com',
        'company_name': 'Skibox',
        'task_date': '2022-01-26',
        'task_description': 'sed interdum venenatis turpis enim blandit mi in porttitor pede',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Jed Lambot',
        'email': 'jlambotlz@nsw.gov.au',
        'company_name': 'Skajo',
        'task_date': '2022-08-17',
        'task_description': 'duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Constantine Laingmaid',
        'email': 'claingmaidm0@cnbc.com',
        'company_name': 'Fatz',
        'task_date': '2021-12-21',
        'task_description': 'maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ambrosi Govett',
        'email': 'agovettm1@g.co',
        'company_name': 'Skilith',
        'task_date': '2022-03-12',
        'task_description': 'massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Randolph Penk',
        'email': 'rpenkm2@ebay.co.uk',
        'company_name': 'Twitterbridge',
        'task_date': '2022-06-01',
        'task_description': 'velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Belle Du Fray',
        'email': 'bdum3@123-reg.co.uk',
        'company_name': 'Linklinks',
        'task_date': '2022-04-17',
        'task_description': 'rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Myrna Wheatman',
        'email': 'mwheatmanm4@hubpages.com',
        'company_name': 'Edgeclub',
        'task_date': '2022-05-20',
        'task_description': 'non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Marcellus Guidoni',
        'email': 'mguidonim5@blogs.com',
        'company_name': 'Dynabox',
        'task_date': '2022-07-02',
        'task_description': 'sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Claudie Vitte',
        'email': 'cvittem6@addthis.com',
        'company_name': 'Chatterpoint',
        'task_date': '2021-12-22',
        'task_description': 'posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Malia Izard',
        'email': 'mizardm7@who.int',
        'company_name': 'Lazz',
        'task_date': '2022-03-02',
        'task_description': 'odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Skye Wards',
        'email': 'swardsm8@friendfeed.com',
        'company_name': 'Jetpulse',
        'task_date': '2021-11-14',
        'task_description': 'aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kathye Wolfinger',
        'email': 'kwolfingerm9@house.gov',
        'company_name': 'Skivee',
        'task_date': '2022-05-29',
        'task_description': 'non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Olivier Peet',
        'email': 'opeetma@dagondesign.com',
        'company_name': 'Skyvu',
        'task_date': '2022-02-12',
        'task_description': 'a libero nam dui proin leo odio porttitor id consequat in consequat ut',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Georgy Dabell',
        'email': 'gdabellmb@who.int',
        'company_name': 'Jabbersphere',
        'task_date': '2022-04-28',
        'task_description': 'quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Eadmund Skeffington',
        'email': 'eskeffingtonmc@cam.ac.uk',
        'company_name': 'Kare',
        'task_date': '2022-03-07',
        'task_description': 'hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Caroljean Nyles',
        'email': 'cnylesmd@ifeng.com',
        'company_name': 'Avavee',
        'task_date': '2022-10-18',
        'task_description': 'rutrum nulla tellus in sagittis dui vel nisl duis ac nibh',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Peirce Medwell',
        'email': 'pmedwellme@jalbum.net',
        'company_name': 'Zoozzy',
        'task_date': '2022-09-10',
        'task_description': 'amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Jere Tale',
        'email': 'jtalemf@google.com',
        'company_name': 'InnoZ',
        'task_date': '2022-04-06',
        'task_description': 'felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Benjamin Hawthorne',
        'email': 'bhawthornemg@cocolog-nifty.com',
        'company_name': 'Tanoodle',
        'task_date': '2022-05-11',
        'task_description': 'amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Andriana Abrahams',
        'email': 'aabrahamsmh@sbwire.com',
        'company_name': 'Oyope',
        'task_date': '2022-11-01',
        'task_description': 'nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Hedvige La Rosa',
        'email': 'hlami@cafepress.com',
        'company_name': 'Flipstorm',
        'task_date': '2022-10-09',
        'task_description': 'at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Chauncey Di Nisco',
        'email': 'cdimj@creativecommons.org',
        'company_name': 'Thoughtstorm',
        'task_date': '2022-10-31',
        'task_description': 'orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Fiann Schanke',
        'email': 'fschankemk@sogou.com',
        'company_name': 'Yoveo',
        'task_date': '2022-10-26',
        'task_description': 'est risus auctor sed tristique in tempus sit amet sem fusce',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Elbertine Hazelgrove',
        'email': 'ehazelgroveml@abc.net.au',
        'company_name': 'LiveZ',
        'task_date': '2022-01-30',
        'task_description': 'odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sapphira Phelipeaux',
        'email': 'sphelipeauxmm@indiegogo.com',
        'company_name': 'Quimba',
        'task_date': '2022-08-16',
        'task_description': 'montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Aprilette Winkle',
        'email': 'awinklemn@mail.ru',
        'company_name': 'LiveZ',
        'task_date': '2021-11-19',
        'task_description': 'non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Irita Thorneloe',
        'email': 'ithorneloemo@twitpic.com',
        'company_name': 'Livetube',
        'task_date': '2022-03-27',
        'task_description': 'nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Marve Essame',
        'email': 'messamemp@upenn.edu',
        'company_name': 'Oozz',
        'task_date': '2022-06-13',
        'task_description': 'sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nonna Jozef',
        'email': 'njozefmq@newyorker.com',
        'company_name': 'Youbridge',
        'task_date': '2022-03-21',
        'task_description': 'ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Idell Dalgarnowch',
        'email': 'idalgarnowchmr@merriam-webster.com',
        'company_name': 'Podcat',
        'task_date': '2022-02-02',
        'task_description': 'justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kristopher Ketley',
        'email': 'kketleyms@addtoany.com',
        'company_name': 'Kwimbee',
        'task_date': '2021-11-15',
        'task_description': 'varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rogers Lubbock',
        'email': 'rlubbockmt@dropbox.com',
        'company_name': 'Avaveo',
        'task_date': '2022-01-31',
        'task_description': 'ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lorilee Mocquer',
        'email': 'lmocquermu@census.gov',
        'company_name': 'Twitterbridge',
        'task_date': '2022-01-28',
        'task_description': 'metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Robinetta Pietersma',
        'email': 'rpietersmamv@mediafire.com',
        'company_name': 'Browsecat',
        'task_date': '2022-11-07',
        'task_description': 'tortor duis mattis egestas metus aenean fermentum donec ut mauris eget',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Margaretha Noice',
        'email': 'mnoicemw@omniture.com',
        'company_name': 'Dabtype',
        'task_date': '2022-03-23',
        'task_description': 'sed accumsan felis ut at dolor quis odio consequat varius integer ac',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Archibald Domenicone',
        'email': 'adomeniconemx@nba.com',
        'company_name': 'Flashspan',
        'task_date': '2022-10-27',
        'task_description': 'venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Artie Holah',
        'email': 'aholahmy@stanford.edu',
        'company_name': 'InnoZ',
        'task_date': '2022-06-08',
        'task_description': 'elementum nullam varius nulla facilisi cras non velit nec nisi',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ekaterina Rewbottom',
        'email': 'erewbottommz@wordpress.com',
        'company_name': 'Devify',
        'task_date': '2022-04-27',
        'task_description': 'quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Franz Blinder',
        'email': 'fblindern0@ftc.gov',
        'company_name': 'Muxo',
        'task_date': '2022-08-25',
        'task_description': 'lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bax Burles',
        'email': 'bburlesn1@51.la',
        'company_name': 'Wikido',
        'task_date': '2022-10-12',
        'task_description': 'lobortis sapien sapien non mi integer ac neque duis bibendum morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Melisa Zupo',
        'email': 'mzupon2@ameblo.jp',
        'company_name': 'Browseblab',
        'task_date': '2022-02-08',
        'task_description': 'semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Gretta Skeeles',
        'email': 'gskeelesn3@fc2.com',
        'company_name': 'Topiclounge',
        'task_date': '2022-09-09',
        'task_description': 'proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Margarita McCafferky',
        'email': 'mmccafferkyn4@deliciousdays.com',
        'company_name': 'Jaxworks',
        'task_date': '2022-06-22',
        'task_description': 'lectus in est risus auctor sed tristique in tempus sit amet sem',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ogden Logsdail',
        'email': 'ologsdailn5@reddit.com',
        'company_name': 'Blogtags',
        'task_date': '2022-09-22',
        'task_description': 'orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Goraud Killingworth',
        'email': 'gkillingworthn6@msu.edu',
        'company_name': 'Wordtune',
        'task_date': '2022-07-20',
        'task_description': 'augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Karrie Coraini',
        'email': 'kcorainin7@sakura.ne.jp',
        'company_name': 'Zooveo',
        'task_date': '2022-07-29',
        'task_description': 'vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hart Lobe',
        'email': 'hloben8@arstechnica.com',
        'company_name': 'Teklist',
        'task_date': '2021-12-27',
        'task_description': 'nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Adriaens Edelheit',
        'email': 'aedelheitn9@ox.ac.uk',
        'company_name': 'Zooveo',
        'task_date': '2022-08-13',
        'task_description': 'non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Valentine Nizet',
        'email': 'vnizetna@usa.gov',
        'company_name': 'Vinte',
        'task_date': '2022-01-27',
        'task_description': 'est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Gwenni Bernth',
        'email': 'gbernthnb@economist.com',
        'company_name': 'Katz',
        'task_date': '2022-05-25',
        'task_description': 'vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Duky Birkby',
        'email': 'dbirkbync@godaddy.com',
        'company_name': 'Mybuzz',
        'task_date': '2022-02-27',
        'task_description': 'quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rosemaria Lanfer',
        'email': 'rlanfernd@devhub.com',
        'company_name': 'Livepath',
        'task_date': '2022-01-07',
        'task_description': 'massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alli Simnett',
        'email': 'asimnettne@yellowbook.com',
        'company_name': 'Pixope',
        'task_date': '2022-04-01',
        'task_description': 'porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Brina James',
        'email': 'bjamesnf@wikispaces.com',
        'company_name': 'Jetpulse',
        'task_date': '2022-06-26',
        'task_description': 'congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Claresta Littler',
        'email': 'clittlerng@omniture.com',
        'company_name': 'Pixonyx',
        'task_date': '2021-12-08',
        'task_description': 'ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Meade Dixon',
        'email': 'mdixonnh@nba.com',
        'company_name': 'Eimbee',
        'task_date': '2022-03-17',
        'task_description': 'justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Flemming Burbidge',
        'email': 'fburbidgeni@naver.com',
        'company_name': 'Thoughtmix',
        'task_date': '2022-06-14',
        'task_description': 'in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Toddy Newbery',
        'email': 'tnewberynj@wordpress.org',
        'company_name': 'Vipe',
        'task_date': '2022-10-07',
        'task_description': 'amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Maddie Brodest',
        'email': 'mbrodestnk@shareasale.com',
        'company_name': 'Teklist',
        'task_date': '2022-03-05',
        'task_description': 'ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Clary Ranfield',
        'email': 'cranfieldnl@wikispaces.com',
        'company_name': 'Ooba',
        'task_date': '2022-06-12',
        'task_description': 'nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Darci Piggens',
        'email': 'dpiggensnm@state.tx.us',
        'company_name': 'Linkbuzz',
        'task_date': '2021-12-28',
        'task_description': 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Orson Drivers',
        'email': 'odriversnn@nhs.uk',
        'company_name': 'Shufflester',
        'task_date': '2022-01-11',
        'task_description': 'erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Engracia Hensmans',
        'email': 'ehensmansno@odnoklassniki.ru',
        'company_name': 'Yamia',
        'task_date': '2022-02-28',
        'task_description': 'nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Mallory Beckford',
        'email': 'mbeckfordnp@sina.com.cn',
        'company_name': 'Roombo',
        'task_date': '2022-05-22',
        'task_description': 'maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Becky Rampley',
        'email': 'brampleynq@privacy.gov.au',
        'company_name': 'Zoozzy',
        'task_date': '2022-05-16',
        'task_description': 'sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Yolande Calderwood',
        'email': 'ycalderwoodnr@mail.ru',
        'company_name': 'Buzzshare',
        'task_date': '2022-11-07',
        'task_description': 'viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Raff Iacoboni',
        'email': 'riacobonins@myspace.com',
        'company_name': 'Wordware',
        'task_date': '2022-04-03',
        'task_description': 'ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Anabal Summerlee',
        'email': 'asummerleent@cam.ac.uk',
        'company_name': 'Topdrive',
        'task_date': '2022-08-05',
        'task_description': 'erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Floyd MacCombe',
        'email': 'fmaccombenu@weebly.com',
        'company_name': 'Flipbug',
        'task_date': '2021-12-16',
        'task_description': 'hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sonnie Whisson',
        'email': 'swhissonnv@tamu.edu',
        'company_name': 'Vinder',
        'task_date': '2022-05-14',
        'task_description': 'sed nisl nunc rhoncus dui vel sem sed sagittis nam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sybil Rigney',
        'email': 'srigneynw@google.nl',
        'company_name': 'Yakidoo',
        'task_date': '2022-03-27',
        'task_description': 'arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hartley Judkins',
        'email': 'hjudkinsnx@fda.gov',
        'company_name': 'Avavee',
        'task_date': '2022-03-08',
        'task_description': 'enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Ferdie Maccari',
        'email': 'fmaccariny@howstuffworks.com',
        'company_name': 'Gigazoom',
        'task_date': '2021-11-26',
        'task_description': 'pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Sisely Jerson',
        'email': 'sjersonnz@weebly.com',
        'company_name': 'Tambee',
        'task_date': '2021-11-15',
        'task_description': 'penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Drucie Saint',
        'email': 'dsainto0@tripadvisor.com',
        'company_name': 'Oozz',
        'task_date': '2021-11-25',
        'task_description': 'sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Kenna Franiak',
        'email': 'kfraniako1@oakley.com',
        'company_name': 'Voomm',
        'task_date': '2022-07-04',
        'task_description': 'egestas metus aenean fermentum donec ut mauris eget massa tempor convallis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Donny Greave',
        'email': 'dgreaveo2@e-recht24.de',
        'company_name': 'Riffwire',
        'task_date': '2022-03-25',
        'task_description': 'diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Chrysa Daysh',
        'email': 'cdaysho3@dion.ne.jp',
        'company_name': 'Dabshots',
        'task_date': '2022-01-29',
        'task_description': 'suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Hebert Cicculi',
        'email': 'hcicculio4@ox.ac.uk',
        'company_name': 'Voonix',
        'task_date': '2022-02-12',
        'task_description': 'eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Giselle Kenton',
        'email': 'gkentono5@si.edu',
        'company_name': 'Blogtag',
        'task_date': '2022-02-10',
        'task_description': 'ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sibeal Fargher',
        'email': 'sfarghero6@thetimes.co.uk',
        'company_name': 'Lazzy',
        'task_date': '2022-03-29',
        'task_description': 'nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Brion Putterill',
        'email': 'bputterillo7@opensource.org',
        'company_name': 'BlogXS',
        'task_date': '2021-12-07',
        'task_description': 'orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lucias Coyish',
        'email': 'lcoyisho8@woothemes.com',
        'company_name': 'Quaxo',
        'task_date': '2022-11-03',
        'task_description': 'commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Mara McLinden',
        'email': 'mmclindeno9@mit.edu',
        'company_name': 'Zoomcast',
        'task_date': '2022-10-07',
        'task_description': 'viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kalinda Laite',
        'email': 'klaiteoa@house.gov',
        'company_name': 'Fliptune',
        'task_date': '2021-12-06',
        'task_description': 'amet justo morbi ut odio cras mi pede malesuada in imperdiet et',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Guy Kimblen',
        'email': 'gkimblenob@cbc.ca',
        'company_name': 'Dynazzy',
        'task_date': '2022-10-07',
        'task_description': 'morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Libbey Rudsdell',
        'email': 'lrudsdelloc@networkadvertising.org',
        'company_name': 'Mudo',
        'task_date': '2022-08-30',
        'task_description': 'mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Alberik Govan',
        'email': 'agovanod@cbsnews.com',
        'company_name': 'Yotz',
        'task_date': '2022-02-13',
        'task_description': 'porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Fernanda Stallibrass',
        'email': 'fstallibrassoe@mashable.com',
        'company_name': 'Trilith',
        'task_date': '2022-03-13',
        'task_description': 'erat volutpat in congue etiam justo etiam pretium iaculis justo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nancee Drews',
        'email': 'ndrewsof@hao123.com',
        'company_name': 'Demizz',
        'task_date': '2022-02-03',
        'task_description': 'odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Merralee Brehat',
        'email': 'mbrehatog@linkedin.com',
        'company_name': 'Gabvine',
        'task_date': '2021-11-23',
        'task_description': 'ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Davin Eivers',
        'email': 'deiversoh@wikia.com',
        'company_name': 'Yata',
        'task_date': '2022-10-23',
        'task_description': 'lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Emelen Refford',
        'email': 'ereffordoi@who.int',
        'company_name': 'Twinder',
        'task_date': '2022-09-23',
        'task_description': 'amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Heath Pinard',
        'email': 'hpinardoj@zdnet.com',
        'company_name': 'InnoZ',
        'task_date': '2022-06-13',
        'task_description': 'id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Rustin Cayton',
        'email': 'rcaytonok@addtoany.com',
        'company_name': 'BlogXS',
        'task_date': '2022-09-29',
        'task_description': 'arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Meggie Marrows',
        'email': 'mmarrowsol@etsy.com',
        'company_name': 'Skynoodle',
        'task_date': '2022-10-21',
        'task_description': 'varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Elle Annion',
        'email': 'eannionom@gmpg.org',
        'company_name': 'Trilith',
        'task_date': '2022-06-06',
        'task_description': 'odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Benji Guyver',
        'email': 'bguyveron@springer.com',
        'company_name': 'Fadeo',
        'task_date': '2022-03-20',
        'task_description': 'cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bird Florentine',
        'email': 'bflorentineoo@youtu.be',
        'company_name': 'Twitterworks',
        'task_date': '2022-07-07',
        'task_description': 'cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Adrian Iskowicz',
        'email': 'aiskowiczop@imgur.com',
        'company_name': 'Thoughtblab',
        'task_date': '2022-03-16',
        'task_description': 'nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Frannie Stott',
        'email': 'fstottoq@merriam-webster.com',
        'company_name': 'Blogpad',
        'task_date': '2022-07-01',
        'task_description': 'luctus cum sociis natoque penatibus et magnis dis parturient montes',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ruby Chadwen',
        'email': 'rchadwenor@rambler.ru',
        'company_name': 'Realfire',
        'task_date': '2022-03-28',
        'task_description': 'vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cly Waslin',
        'email': 'cwaslinos@scribd.com',
        'company_name': 'Tavu',
        'task_date': '2022-10-03',
        'task_description': 'praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Valery Coggin',
        'email': 'vcogginot@booking.com',
        'company_name': 'Digitube',
        'task_date': '2022-07-15',
        'task_description': 'risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Waiter Hallam',
        'email': 'whallamou@canalblog.com',
        'company_name': 'Realmix',
        'task_date': '2022-04-11',
        'task_description': 'eget nunc donec quis orci eget orci vehicula condimentum curabitur',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Blancha Ellwell',
        'email': 'bellwellov@hubpages.com',
        'company_name': 'Mynte',
        'task_date': '2022-01-19',
        'task_description': 'leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Katrine MacArte',
        'email': 'kmacarteow@utexas.edu',
        'company_name': 'Bubbletube',
        'task_date': '2022-08-29',
        'task_description': 'faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Hetty MacIlory',
        'email': 'hmaciloryox@soup.io',
        'company_name': 'Skajo',
        'task_date': '2022-03-05',
        'task_description': 'in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Roxane Renahan',
        'email': 'rrenahanoy@mozilla.org',
        'company_name': 'Mycat',
        'task_date': '2022-09-03',
        'task_description': 'morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Candi Letcher',
        'email': 'cletcheroz@histats.com',
        'company_name': 'Devpulse',
        'task_date': '2022-02-19',
        'task_description': 'lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Jonie McAsgill',
        'email': 'jmcasgillp0@eepurl.com',
        'company_name': 'Einti',
        'task_date': '2022-09-06',
        'task_description': 'scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kelby Alliott',
        'email': 'kalliottp1@sphinn.com',
        'company_name': 'Flashpoint',
        'task_date': '2022-01-27',
        'task_description': 'in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Chelsae Kellog',
        'email': 'ckellogp2@ebay.com',
        'company_name': 'Wikibox',
        'task_date': '2022-09-06',
        'task_description': 'sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Wally Kliche',
        'email': 'wklichep3@last.fm',
        'company_name': 'Ntag',
        'task_date': '2022-09-08',
        'task_description': 'curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Vivi Yvens',
        'email': 'vyvensp4@slate.com',
        'company_name': 'Dazzlesphere',
        'task_date': '2022-03-30',
        'task_description': 'orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Corrianne McKennan',
        'email': 'cmckennanp5@dyndns.org',
        'company_name': 'Zooxo',
        'task_date': '2022-08-06',
        'task_description': 'purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Cobby McCurley',
        'email': 'cmccurleyp6@newsvine.com',
        'company_name': 'Chatterpoint',
        'task_date': '2022-06-05',
        'task_description': 'amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jackelyn Hunnaball',
        'email': 'jhunnaballp7@weather.com',
        'company_name': 'Devcast',
        'task_date': '2022-09-05',
        'task_description': 'magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Boyce Keneleyside',
        'email': 'bkeneleysidep8@mit.edu',
        'company_name': 'Thoughtblab',
        'task_date': '2022-09-28',
        'task_description': 'mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lezlie Lammers',
        'email': 'llammersp9@hhs.gov',
        'company_name': 'Gabspot',
        'task_date': '2022-09-01',
        'task_description': 'velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Zebedee Chatenet',
        'email': 'zchatenetpa@cdc.gov',
        'company_name': 'Jetpulse',
        'task_date': '2022-01-24',
        'task_description': 'in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Rhys Stride',
        'email': 'rstridepb@moonfruit.com',
        'company_name': 'Tagtune',
        'task_date': '2022-09-08',
        'task_description': 'ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Magdalena Carlisi',
        'email': 'mcarlisipc@yale.edu',
        'company_name': 'Devbug',
        'task_date': '2022-07-11',
        'task_description': 'donec semper sapien a libero nam dui proin leo odio porttitor',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Irvine Attril',
        'email': 'iattrilpd@washingtonpost.com',
        'company_name': 'Rhybox',
        'task_date': '2022-08-24',
        'task_description': 'id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nancy Caldwell',
        'email': 'ncaldwellpe@intel.com',
        'company_name': 'Oyondu',
        'task_date': '2022-04-16',
        'task_description': 'justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Casey Tillot',
        'email': 'ctillotpf@msn.com',
        'company_name': 'Blogpad',
        'task_date': '2022-02-07',
        'task_description': 'morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Donia Andrag',
        'email': 'dandragpg@disqus.com',
        'company_name': 'Skinix',
        'task_date': '2021-12-19',
        'task_description': 'id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Quillan Steventon',
        'email': 'qsteventonph@newsvine.com',
        'company_name': 'Voolith',
        'task_date': '2022-09-12',
        'task_description': 'lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Roley Leagas',
        'email': 'rleagaspi@feedburner.com',
        'company_name': 'Tagpad',
        'task_date': '2022-06-09',
        'task_description': 'id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Mireielle Byers',
        'email': 'mbyerspj@hatena.ne.jp',
        'company_name': 'Plambee',
        'task_date': '2022-03-25',
        'task_description': 'ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Babs Blaxter',
        'email': 'bblaxterpk@uiuc.edu',
        'company_name': 'Kwimbee',
        'task_date': '2022-09-14',
        'task_description': 'non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Nicky De Pietri',
        'email': 'ndepl@bing.com',
        'company_name': 'Fanoodle',
        'task_date': '2022-07-30',
        'task_description': 'velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Twyla Slevin',
        'email': 'tslevinpm@yellowbook.com',
        'company_name': 'Dynava',
        'task_date': '2022-09-27',
        'task_description': 'quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Myrtle Greenard',
        'email': 'mgreenardpn@cornell.edu',
        'company_name': 'Devbug',
        'task_date': '2022-07-13',
        'task_description': 'tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jeana Ryle',
        'email': 'jrylepo@weather.com',
        'company_name': 'Mycat',
        'task_date': '2022-11-08',
        'task_description': 'dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Danika Teodorski',
        'email': 'dteodorskipp@spotify.com',
        'company_name': 'Zoomlounge',
        'task_date': '2022-01-04',
        'task_description': 'pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Noelle Brockie',
        'email': 'nbrockiepq@goo.gl',
        'company_name': 'Cogilith',
        'task_date': '2022-10-15',
        'task_description': 'suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Kayne Aykroyd',
        'email': 'kaykroydpr@wufoo.com',
        'company_name': 'Quinu',
        'task_date': '2022-10-13',
        'task_description': 'habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Durand Kalinowsky',
        'email': 'dkalinowskyps@hc360.com',
        'company_name': 'Skinder',
        'task_date': '2022-06-07',
        'task_description': 'vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Kaleb Desantis',
        'email': 'kdesantispt@dion.ne.jp',
        'company_name': 'Eazzy',
        'task_date': '2021-11-16',
        'task_description': 'sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Egon Ritzman',
        'email': 'eritzmanpu@psu.edu',
        'company_name': 'Fliptune',
        'task_date': '2022-10-24',
        'task_description': 'et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Katerine Ibarra',
        'email': 'kibarrapv@goo.gl',
        'company_name': 'Demivee',
        'task_date': '2022-10-11',
        'task_description': 'nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Leland Christofor',
        'email': 'lchristoforpw@sogou.com',
        'company_name': 'Thoughtsphere',
        'task_date': '2022-10-29',
        'task_description': 'mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Sharron Ferreira',
        'email': 'sferreirapx@zimbio.com',
        'company_name': 'Centimia',
        'task_date': '2022-04-26',
        'task_description': 'vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Leilah Giamitti',
        'email': 'lgiamittipy@eepurl.com',
        'company_name': 'Avaveo',
        'task_date': '2022-09-19',
        'task_description': 'dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Corabelle Ilott',
        'email': 'cilottpz@canalblog.com',
        'company_name': 'Eadel',
        'task_date': '2021-11-15',
        'task_description': 'at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Beryle Goathrop',
        'email': 'bgoathropq0@dropbox.com',
        'company_name': 'Youfeed',
        'task_date': '2022-10-09',
        'task_description': 'mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Deena Burbudge',
        'email': 'dburbudgeq1@oakley.com',
        'company_name': 'Youspan',
        'task_date': '2022-05-05',
        'task_description': 'tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bryn Matissoff',
        'email': 'bmatissoffq2@about.me',
        'company_name': 'Geba',
        'task_date': '2022-10-16',
        'task_description': 'non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Waverley Crudge',
        'email': 'wcrudgeq3@comsenz.com',
        'company_name': 'Rhynyx',
        'task_date': '2022-01-18',
        'task_description': 'mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Janice Toffolo',
        'email': 'jtoffoloq4@washington.edu',
        'company_name': 'Babblestorm',
        'task_date': '2022-10-20',
        'task_description': 'cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sophronia Pursey',
        'email': 'spurseyq5@php.net',
        'company_name': 'Jazzy',
        'task_date': '2022-10-07',
        'task_description': 'quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Tito Bibey',
        'email': 'tbibeyq6@ox.ac.uk',
        'company_name': 'Mita',
        'task_date': '2022-01-05',
        'task_description': 'suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Glenna Gaudon',
        'email': 'ggaudonq7@reuters.com',
        'company_name': 'Skinix',
        'task_date': '2022-10-26',
        'task_description': 'ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Carlin Tuffell',
        'email': 'ctuffellq8@timesonline.co.uk',
        'company_name': 'Skalith',
        'task_date': '2022-02-27',
        'task_description': 'vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Mickey Gosnall',
        'email': 'mgosnallq9@yellowpages.com',
        'company_name': 'Thoughtstorm',
        'task_date': '2022-07-20',
        'task_description': 'vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Melloney Hyatt',
        'email': 'mhyattqa@1688.com',
        'company_name': 'Blogtags',
        'task_date': '2021-11-23',
        'task_description': 'porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Tarra Gerritsma',
        'email': 'tgerritsmaqb@liveinternet.ru',
        'company_name': 'Quire',
        'task_date': '2022-05-23',
        'task_description': 'urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Onfroi Cottam',
        'email': 'ocottamqc@eepurl.com',
        'company_name': 'Zooveo',
        'task_date': '2022-08-13',
        'task_description': 'ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Aldwin Absalom',
        'email': 'aabsalomqd@stanford.edu',
        'company_name': 'Rhybox',
        'task_date': '2022-04-06',
        'task_description': 'lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Elka Teodorski',
        'email': 'eteodorskiqe@tripod.com',
        'company_name': 'Livetube',
        'task_date': '2022-09-26',
        'task_description': 'a odio in hac habitasse platea dictumst maecenas ut massa quis augue',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Alleen Mackison',
        'email': 'amackisonqf@goodreads.com',
        'company_name': 'Gevee',
        'task_date': '2022-03-02',
        'task_description': 'vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Molli Huglin',
        'email': 'mhuglinqg@mayoclinic.com',
        'company_name': 'Fivebridge',
        'task_date': '2022-03-29',
        'task_description': 'a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Anderea Whatford',
        'email': 'awhatfordqh@wired.com',
        'company_name': 'Cogibox',
        'task_date': '2022-02-11',
        'task_description': 'convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Estrella Craigmyle',
        'email': 'ecraigmyleqi@wordpress.com',
        'company_name': 'Thoughtsphere',
        'task_date': '2022-03-08',
        'task_description': 'erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jehanna Hightown',
        'email': 'jhightownqj@e-recht24.de',
        'company_name': 'Digitube',
        'task_date': '2022-06-22',
        'task_description': 'quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Justis Tinman',
        'email': 'jtinmanqk@i2i.jp',
        'company_name': 'Voonyx',
        'task_date': '2022-01-04',
        'task_description': 'massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Dar Curthoys',
        'email': 'dcurthoysql@psu.edu',
        'company_name': 'Feedfish',
        'task_date': '2022-02-15',
        'task_description': 'massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Anet Mottini',
        'email': 'amottiniqm@fastcompany.com',
        'company_name': 'Mycat',
        'task_date': '2022-10-08',
        'task_description': 'pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Etta Blakiston',
        'email': 'eblakistonqn@vimeo.com',
        'company_name': 'Aimbo',
        'task_date': '2022-10-12',
        'task_description': 'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Jeri Syrie',
        'email': 'jsyrieqo@live.com',
        'company_name': 'Skyba',
        'task_date': '2022-06-25',
        'task_description': 'ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Shurwood Clutten',
        'email': 'scluttenqp@boston.com',
        'company_name': 'Bubblemix',
        'task_date': '2022-06-19',
        'task_description': 'est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Vinnie Livsey',
        'email': 'vlivseyqq@ask.com',
        'company_name': 'Blognation',
        'task_date': '2022-03-25',
        'task_description': 'a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Paten Bettesworth',
        'email': 'pbettesworthqr@walmart.com',
        'company_name': 'Skibox',
        'task_date': '2022-07-09',
        'task_description': 'amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Burt Nelane',
        'email': 'bnelaneqs@arstechnica.com',
        'company_name': 'Photospace',
        'task_date': '2022-10-14',
        'task_description': 'felis sed interdum venenatis turpis enim blandit mi in porttitor pede',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Ailsun Ollie',
        'email': 'aollieqt@theatlantic.com',
        'company_name': 'Thoughtsphere',
        'task_date': '2022-06-27',
        'task_description': 'viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lizzie Henrych',
        'email': 'lhenrychqu@indiatimes.com',
        'company_name': 'Tagtune',
        'task_date': '2022-10-07',
        'task_description': 'volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cynthy Megroff',
        'email': 'cmegroffqv@ftc.gov',
        'company_name': 'Thoughtbridge',
        'task_date': '2022-09-23',
        'task_description': 'dapibus duis at velit eu est congue elementum in hac habitasse',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Rourke Badder',
        'email': 'rbadderqw@amazon.com',
        'company_name': 'Babbleblab',
        'task_date': '2022-01-22',
        'task_description': 'eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Mozelle Menelaws',
        'email': 'mmenelawsqx@yahoo.com',
        'company_name': 'Skalith',
        'task_date': '2022-01-23',
        'task_description': 'vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Junina Davydochkin',
        'email': 'jdavydochkinqy@berkeley.edu',
        'company_name': 'Oyoloo',
        'task_date': '2022-06-17',
        'task_description': 'cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Farlay Baskwell',
        'email': 'fbaskwellqz@goodreads.com',
        'company_name': 'Realcube',
        'task_date': '2021-12-30',
        'task_description': 'facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ileana Shaughnessy',
        'email': 'ishaughnessyr0@ebay.com',
        'company_name': 'Thoughtsphere',
        'task_date': '2022-10-26',
        'task_description': 'vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Erica Tanser',
        'email': 'etanserr1@smugmug.com',
        'company_name': 'Browsecat',
        'task_date': '2022-06-12',
        'task_description': 'est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Renell Immins',
        'email': 'rimminsr2@mlb.com',
        'company_name': 'Innojam',
        'task_date': '2022-09-14',
        'task_description': 'erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Darice McGuirk',
        'email': 'dmcguirkr3@mail.ru',
        'company_name': 'Twinte',
        'task_date': '2022-11-07',
        'task_description': 'vulputate luctus cum sociis natoque penatibus et magnis dis parturient',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nixie Heelis',
        'email': 'nheelisr4@craigslist.org',
        'company_name': 'Kwimbee',
        'task_date': '2022-04-25',
        'task_description': 'suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Nelia Stalf',
        'email': 'nstalfr5@hud.gov',
        'company_name': 'Roodel',
        'task_date': '2022-03-28',
        'task_description': 'eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Sophi Bolitho',
        'email': 'sbolithor6@cloudflare.com',
        'company_name': 'Tazz',
        'task_date': '2021-12-04',
        'task_description': 'maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Bobbye Ackerley',
        'email': 'backerleyr7@naver.com',
        'company_name': 'Fivespan',
        'task_date': '2022-02-03',
        'task_description': 'felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Devora Trevains',
        'email': 'dtrevainsr8@nbcnews.com',
        'company_name': 'JumpXS',
        'task_date': '2022-08-18',
        'task_description': 'vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Flory Legonidec',
        'email': 'flegonidecr9@ebay.co.uk',
        'company_name': 'Dabvine',
        'task_date': '2022-03-23',
        'task_description': 'condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Myron Chapell',
        'email': 'mchapellra@etsy.com',
        'company_name': 'Topicshots',
        'task_date': '2022-06-11',
        'task_description': 'at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Lindsey Dauncey',
        'email': 'ldaunceyrb@imgur.com',
        'company_name': 'Devpulse',
        'task_date': '2021-12-04',
        'task_description': 'vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Hew Sutherden',
        'email': 'hsutherdenrc@soundcloud.com',
        'company_name': 'Kayveo',
        'task_date': '2022-10-19',
        'task_description': 'amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Edan Shanahan',
        'email': 'eshanahanrd@joomla.org',
        'company_name': 'Voolia',
        'task_date': '2022-06-02',
        'task_description': 'duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Jeralee Fellibrand',
        'email': 'jfellibrandre@yale.edu',
        'company_name': 'Skilith',
        'task_date': '2022-05-01',
        'task_description': 'lacus at turpis donec posuere metus vitae ipsum aliquam non mauris',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Cherise Traill',
        'email': 'ctraillrf@msu.edu',
        'company_name': 'BlogXS',
        'task_date': '2022-04-20',
        'task_description': 'vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Norah Jeske',
        'email': 'njeskerg@imgur.com',
        'company_name': 'Meemm',
        'task_date': '2022-02-17',
        'task_description': 'suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Emalia Barrand',
        'email': 'ebarrandrh@t-online.de',
        'company_name': 'Camimbo',
        'task_date': '2022-05-14',
        'task_description': 'montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Lian Rozsa',
        'email': 'lrozsari@sohu.com',
        'company_name': 'Omba',
        'task_date': '2021-12-22',
        'task_description': 'leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Ewart Henzer',
        'email': 'ehenzerrj@china.com.cn',
        'company_name': 'Riffpedia',
        'task_date': '2022-10-19',
        'task_description': 'at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Des Fortie',
        'email': 'dfortierk@ucoz.ru',
        'company_name': 'Latz',
        'task_date': '2022-04-11',
        'task_description': 'morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Vittorio Murra',
        'email': 'vmurrarl@alibaba.com',
        'company_name': 'Vinte',
        'task_date': '2022-04-12',
        'task_description': 'praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Brnaby Soppett',
        'email': 'bsoppettrm@gnu.org',
        'company_name': 'Voonyx',
        'task_date': '2022-08-16',
        'task_description': 'pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra',
        'task_status': 'APPROVED'
    },
    {
        'task_owner': 'Berky Toman',
        'email': 'btomanrn@nasa.gov',
        'company_name': 'Meevee',
        'task_date': '2021-12-10',
        'task_description': 'lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Westbrooke Bangley',
        'email': 'wbangleyro@shop-pro.jp',
        'company_name': 'Jabberbean',
        'task_date': '2022-07-11',
        'task_description': 'turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Naoma Hindenburg',
        'email': 'nhindenburgrp@google.fr',
        'company_name': 'LiveZ',
        'task_date': '2022-03-25',
        'task_description': 'pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros',
        'task_status': 'REJECTED'
    },
    {
        'task_owner': 'Monah Ahlin',
        'email': 'mahlinrq@quantcast.com',
        'company_name': 'Jaxspan',
        'task_date': '2022-07-07',
        'task_description': 'magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed',
        'task_status': 'IN_REVIEW'
    },
    {
        'task_owner': 'Olenolin Clethro',
        'email': 'oclethrorr@timesonline.co.uk',
        'company_name': 'Rhynyx',
        'task_date': '2021-12-08',
        'task_description': 'donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo',
        'task_status': 'IN_REVIEW'
    }
];

export default mockData;