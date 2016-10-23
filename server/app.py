#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from flask import Flask, make_response
from flask_restful import Resource, Api

from pymongo import MongoClient
from bson.json_util import dumps


def output_json(obj, code, headers=None):
    resp = make_response(dumps(obj), code)
    resp.headers.extend(headers or {})
    return resp

DEFAULT_REPRESENTATIONS = {'application/json': output_json}

app = Flask(__name__)
api = Api(app)
api.representations = DEFAULT_REPRESENTATIONS


class List(Resource):
    def get(self):
        with MongoClient() as conn:
            db = conn.get_database('songbook')
            songs = db.songs.find()
            return songs

api.add_resource(List, '/api/list/')

if __name__ == "__main__":
    app.run(port=int(os.environ.get('PORT', 5000)),
            debug=os.environ.get('DEBUG', False))
