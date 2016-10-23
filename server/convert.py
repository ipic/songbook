#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
import unicodedata
import os

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from StringIO import StringIO

from pymongo import MongoClient


def slugify(value):
    """
    Convert to ASCII if 'allow_unicode' is False. Convert spaces to hyphens.
    Remove characters that aren't alphanumerics, underscores, or hyphens.
    Convert to lowercase. Also strip leading and trailing whitespace.
    """
    print value, type(value)
    value = value.decode('utf-8')
    value = unicodedata.normalize('NFKC', value)
    value = re.sub(r'[^\w\s-]', '', value, flags=re.U).strip().lower()
    return re.sub(r'[-\s]+', '-', value, flags=re.U)
    #value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    #value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    #return re.sub(r'[-\s]+', '-', value)


def build_database():
    rsrcmgr = PDFResourceManager()
    codec = 'utf-8'
    laparams = LAParams()
    path = os.path.join(os.path.abspath('.'), 'server', 'songbook.pdf')
    fp = file(path, 'rb')
    pagenos = set()
    pages = PDFPage.get_pages(fp, pagenos)
    conn = MongoClient()
    db = conn.get_database('songbook')
    db.drop_collection('songs')
    print 'Rebuilding database'
    not_found = 0
    for i, page in enumerate(pages, start=1):
        if i <= 8:
            continue
        print 'Processing Page {}'.format(i)
        retstr = StringIO()
        device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        interpreter.process_page(page)

        text = retstr.getvalue()
        title = text.split('\n', 1)[0].strip()
        if not title:
            not_found += 1

        data = {
            'title': title,
            'text': text,
            'img': '',
            'slug': slugify(title),
        }
        print data
        db.songs.insert_one(data)
        retstr.close()
        device.close()
        fp.close()
        conn.close()
        print "Nao encontrados => %s" % not_found


if __name__ == "__main__":
    build_database()
