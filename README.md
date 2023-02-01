# Signol 🍃 coding challenge. 

This is a very simple REST API with the standard CRUD operations GET, POST, PUT, PATCH, and DELETE handled by the Django Rest Framework server.

Written in: _Python 3.8.13_

### Techstack requested vs techstack is implemented so far.
- [x] Spin up a RESTAPI
- [x] Python3
- [x] CI and automated test suite
- [ ] Javascript/React
- [ ] AWS Serverless for deployment
- [x] CRUD ops
- [x] Tailwind CSS
- [ ] Responsive UI
- [x] PostgreSQL
- [ ] Minimum 2 db tables

> PostgreSQL has been configured and commented out. SQLite has been used instead. In order to spin up a postgreSQL instance locally, you either need to do it manually or I have to containerise the package and provide it out of the box. 

## How To

This is a fork of [signol's project](https://github.com/Signolteam/coding-challenges).

**Step 1**: Clone the repository and paste it locally under project's folder.

```bash
mkdir task-manager && cd task-manager && git clone <project-image> .
```

**Step 2**: Create a virtual environment & activate it.

```bash
virtualenv venv && source venv/bin/activate
```

**Step 3**: Install the dependencies.
```bash
pip install -r requirements.txt
```

**Step 4**: Serve the site from root directory.
```python
python manage.py runserver
```

###### Contact: themistheodoratos@gmail.com
