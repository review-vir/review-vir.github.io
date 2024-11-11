import {removePrefix, safeMatch} from '@augment-vir/common';

/**
 * Accepts a pull request text body, expected to be in plain text format (not markdown) and parses
 * out tagged primary reviewers from strings that look like:
 *
 * `primary reviewer: @username, @otherUsername`
 *
 * Which will return the following output:
 *
 * `['username', 'otherUsername']`
 */
export function parsePrimaryReviewers({bodyText}: {bodyText: string}): string[] {
    const [
        ,
        match,
    ] = safeMatch(bodyText, /primary reviewers?\W+((?:@[^@]+)+)(?:\n\n|$|\n#)/i);

    if (!match) {
        return [];
    }

    const [
        ,
        restrictedMatch,
    ] = safeMatch(match, /((?:@[\w-]+[^\w@]*)+)/);

    const userTags = Array.from(restrictedMatch?.matchAll(/@[\w-]+/g) || []);

    return userTags.map((userTag) => removePrefix({value: userTag[0], prefix: '@'}));
}
